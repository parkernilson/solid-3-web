export const compareDates = (a: Date | string | undefined, b: Date | string | undefined): number => {
    if (!a && !b) {
        return 0;
    } else if (!a) {
        return -1;
    } else if (!b) {
        return 1;
    }
    const dateA = a instanceof Date ? a : new Date(a);
    const dateB = b instanceof Date ? b : new Date(b);
    return dateA > dateB ? 1 : -1;
}