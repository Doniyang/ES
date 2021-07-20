import isArray from './isArray';
export default function isObject(o) {
    return o !== null && typeof o === 'object' && isArray(o) === false && Object.prototype.toString.call(o) === '[object Object]';
}
