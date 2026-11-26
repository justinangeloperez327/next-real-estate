import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_LOCATION,
  LISTING_ID_PATTERN,
  PAGE_SIZE,
} from "../features/properties/constants.ts";
import {
  normalizeDetail,
  normalizeSearchResult,
} from "../features/properties/normalize.ts";
import { RealtyApiError, realtyGet } from "../lib/realtyapi/client.ts";

const markets = [
  { searchType: "For_Sale", status: "for_sale", category: "sale" },
  { searchType: "For_Rent", status: "for_rent", category: "rent" },
];
const detailConcurrency = 4;

async function loadDetail(raw, summary) {
  let data;
  try {
    data = await realtyGet("/details/byid", { property_id: summary.id });
  } catch (error) {
    if (!(error instanceof RealtyApiError) || error.status !== 404) throw error;
  }

  const detail = data?.detail;
  if (!detail) {
    if (data && detail !== null)
      throw new Error("Unexpected property detail response");
    return { ...normalizeDetail({ property_id: summary.id }), ...summary };
  }
  if (String(detail.property_id) !== summary.id) {
    throw new Error("Property detail ID did not match the search result");
  }

  return normalizeDetail({
    ...detail,
    property_id: summary.id,
    address: { ...raw.address, ...detail.address },
    status: detail.status ?? raw.status,
    href: detail.href ?? raw.href,
    list_price: detail.list_price ?? raw.list_price,
    list_price_min: detail.list_price_min ?? raw.list_price_min,
    list_price_max: detail.list_price_max ?? raw.list_price_max,
    list_date: detail.list_date ?? raw.list_date,
    photos: detail.photos?.length
      ? detail.photos
      : summary.photos.map((href) => ({ href })),
    advertisers: detail.advertisers ?? raw.advertisers,
    flags: detail.flags ?? raw.flags,
    details: {
      beds: raw.beds ?? raw.beds_min,
      baths: raw.baths ?? raw.baths_min,
      sqft: raw.sqft,
      lot_sqft: raw.lot_sqft,
      year_built: raw.year_built,
      type: raw.property_type,
      text: raw.description_text,
      ...detail.details,
    },
  });
}

async function loadSnapshot(location) {
  const candidates = new Map();

  for (const { searchType, status, category } of markets) {
    const { searchResults } = await realtyGet("/search/bylocation", {
      location,
      searchType,
      sortOrder: "Recommended",
      page: 1,
      resultCount: PAGE_SIZE,
      hasPhotos: true,
    });
    if (!Array.isArray(searchResults)) {
      throw new Error(`Unexpected search response for ${searchType}`);
    }
    for (const [position, result] of searchResults
      .slice(0, PAGE_SIZE)
      .entries()) {
      const id = String(result?.property_id ?? "");
      if (!LISTING_ID_PATTERN.test(id) || candidates.has(id)) continue;
      const raw = {
        ...result,
        property_id: id,
        status: result.status ?? status,
      };
      const summary = normalizeSearchResult(raw);
      if (summary.category === category)
        candidates.set(id, { raw, summary, position, category });
    }
  }

  const rows = [];
  const listings = [...candidates.values()];
  for (let index = 0; index < listings.length; index += detailConcurrency) {
    const batch = await Promise.allSettled(
      listings
        .slice(index, index + detailConcurrency)
        .map(async ({ raw, summary, position, category }) => {
          const detail = await loadDetail(raw, summary);
          if (detail.category !== category) return null;
          return {
            id: summary.id,
            category,
            position,
            summary,
            detail,
            neighborhood: detail.neighborhood,
          };
        }),
    );
    for (const result of batch) {
      if (result.status === "rejected") throw result.reason;
      if (result.value) rows.push(result.value);
    }
  }
  if (rows.length === 0)
    throw new Error("The provider returned no usable properties");
  return rows;
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !process.env.REALTYAPI_KEY) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and REALTYAPI_KEY before importing",
    );
  }

  const database = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const runId = randomUUID();
  const { data: month, error: claimError } = await database.rpc(
    "claim_property_import",
    {
      import_id: runId,
    },
  );
  if (claimError)
    throw new Error(`Could not claim the import: ${claimError.message}`);
  if (!month) {
    console.info(
      "This month’s property import is already complete or running.",
    );
    return;
  }

  try {
    const rows = await loadSnapshot(DEFAULT_LOCATION);
    const { error } = await database.rpc("publish_property_snapshot", {
      import_month: month,
      import_id: runId,
      listings: rows,
    });
    if (error)
      throw new Error(`Could not publish the snapshot: ${error.message}`);
    console.info(
      `Published ${rows.length} properties for ${month} (${DEFAULT_LOCATION}).`,
    );
  } catch (error) {
    const { error: releaseError } = await database
      .from("property_import_runs")
      .delete()
      .eq("run_id", runId)
      .eq("month", month)
      .is("completed_at", null);
    if (releaseError)
      console.error(
        "Could not release the import claim:",
        releaseError.message,
      );
    throw error;
  }
}

await main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
