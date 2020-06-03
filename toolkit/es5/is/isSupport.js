export default function isSupport(event) {
    return event in document || event in window;
}
