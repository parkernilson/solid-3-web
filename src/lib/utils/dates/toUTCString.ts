export const toUTCString = (date: Date | string) => {
    return typeof date === 'string' ? new Date(date).toUTCString() : date.toUTCString();
}