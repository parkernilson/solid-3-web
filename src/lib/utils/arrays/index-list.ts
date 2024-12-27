type Key = string | number
export const indexBy = <T>(list: T[], key: (t: T) => Key) => {
    return list.reduce((acc, cur) => {
        acc[key(cur)] = cur
        return acc
    }, {} as Record<Key, T>)
}