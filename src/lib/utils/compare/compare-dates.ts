/**
 * Compare two dates for sorting. If date a comes after date b, then it is considered larger.
 * @returns 1 if a > b, 0 if a and b are the same date, -1 if a < b
 */
export const compareDates = (a: Date | string, b: Date | string): number => {
    const dateA = a instanceof Date ? a : new Date(a);
    const dateB = b instanceof Date ? b : new Date(b);
    return dateA > dateB ? 1 : -1;
}