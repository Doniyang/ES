export default interface Eventable {
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    reset(): void;
}
