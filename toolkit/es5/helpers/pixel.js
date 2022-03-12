export default function pixel(px) {
    return px + (isNaN(px) ? '' : 'px');
}
