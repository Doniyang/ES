declare namespace NotifierKit {
    export type NotiyParams = number | string | boolean | object

    export interface NotifyEventCallback<T> {
        (evt: T, ...args: Array<NotiyParams>): void
    }
}