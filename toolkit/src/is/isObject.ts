import isArray from './isArray'
export default function isObject(o: any): o is object {
    return o !== null && typeof o === 'object' && isArray(o) === false && Object.prototype.toString.call(o) === '[object Object]'
}