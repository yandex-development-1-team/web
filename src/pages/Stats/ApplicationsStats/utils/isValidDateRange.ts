export const isValidDateRange = (dateFrom: Date | undefined, dateTo: Date | undefined) =>
  !!(dateFrom && dateTo && dateFrom <= dateTo)
