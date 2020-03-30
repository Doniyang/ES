export default function isFunction(fn) {
    return typeof fn === 'function' && fn instanceof Function;
}
