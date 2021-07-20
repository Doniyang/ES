export default function assign(target, ...sources) {
    let to = target || {};
    for (let index = 0; index < sources.length; index++) {
        const source = sources[index];
        if (source != null) {
            for (let key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    to[key] = source[key];
                }
            }
        }
    }
    return to;
}
