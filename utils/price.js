export const centsToPrice = (cents) =>
  (cents / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
