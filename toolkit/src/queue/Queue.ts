export default interface Queue<T> {
    push(item:T): void;
    pop(): T;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): T;
    getRear(): T;
}