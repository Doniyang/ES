export default function isArray(value) {
    return (typeof value == 'object') && value instanceof Array;
}
