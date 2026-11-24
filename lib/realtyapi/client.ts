import "server-only";

const BASE_URL = "https://realtor.realtyapi.io";
const TIMEOUT_MS = 15_000;

export class RealtyApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "RealtyApiError";
  }
}

type Query = Record<string, string | number | boolean | undefined>;

/**
 * GET a RealtyAPI (Realtor.com provider) endpoint.
 * Auth is the `x-realtyapi-key` header; the key lives only on the server
 * (REALTYAPI_KEY) and is never sent to the browser.
 * Every request costs plan credits, so callers should cache results.
 */
export async function realtyGet<T>(
  path: string,
  query: Query = {},
): Promise<T> {
  const key = process.env.REALTYAPI_KEY;
  if (!key) throw new RealtyApiError("REALTYAPI_KEY is not set");

  const url = new URL(path, BASE_URL);
  for (const [name, value] of Object.entries(query)) {
    if (value !== undefined && value !== "")
      url.searchParams.set(name, String(value));
  }

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "x-realtyapi-key": key, accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    throw new RealtyApiError(
      `RealtyAPI request failed: ${(error as Error).message}`,
    );
  }

  if (!res.ok) {
    throw new RealtyApiError(
      `RealtyAPI ${path} responded ${res.status}`,
      res.status,
    );
  }
  return (await res.json()) as T;
}
