export default abstract class Notification<T> {
    /**
      *bind a event to some object
      */
    abstract on(name: string, fn: NotifierKit.NotifyEventCallback<T>): void;
    /**
     * set off event from object
     */
    abstract off(name: string, fn: NotifierKit.NotifyEventCallback<T>): void;
    /**
     *has something
     */
    abstract has(name: string, fn: NotifierKit.NotifyEventCallback<T>): boolean;
    /**
      * clean all notice
      */
    abstract clean(): void;
    /**
     *notify event
     */
    abstract notify(name: string, ...args: Array<NotifierKit.NotiyParams>): void;
}
