export default function isDate(value) {
    return typeof value === 'object' && value instanceof Date;
}
