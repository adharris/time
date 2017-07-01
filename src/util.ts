

export function doNTimes<T>(n: number, callback: (index: number) => T): T[] {
    let results = Array<T>(n);
    for (let i = 0; i < n; i++) {
        results[i] = callback(i);
    }
    return results;
}