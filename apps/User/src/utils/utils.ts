export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Australia/Sydney",
  }).format(date);
}

export enum TransactionStatus {
  SUCCESS = "Success",
  FAILED = "Failed",
  PROCESSING = "Processing",
}