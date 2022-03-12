export function group(ary, key, sort) {
    return Array.from(new Set(ary.map(data => data[key]))).sort(sort).reduce((a, c) => {
        a.push(ary.filter(item => item[key] === c));
        return a;
    }, []);
}
