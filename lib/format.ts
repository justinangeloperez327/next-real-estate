const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** "$450,000", "$1,800 – $2,400", or "Price on request". */
export function formatListingPrice(
  price: number | null,
  priceMax?: number | null,
): string {
  if (price === null) return "Price on request";
  if (priceMax && priceMax > price) {
    return `${formatPrice(price)} – ${formatPrice(priceMax)}`;
  }
  return formatPrice(price);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function formatDate(value: string | Date): string {
  return dateFormatter.format(new Date(value));
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export function formatDateTime(value: string | Date): string {
  return `${dateTimeFormatter.format(new Date(value))} UTC`;
}
