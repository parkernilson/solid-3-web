export const filterUndefined = <T>(list: (T | undefined)[]): T[] => {
    return list.filter((item): item is T => item !== undefined);
}