export declare class ClassicEvent {
    /*
     *  event  exist in DOM or not
     */
    readonly bubbles: boolean
    /*
    * event can cancel or not
    */
    readonly cancelable: boolean
    /**
    * event target
    */
    readonly target: EventKit.EventContextOptions
    /**
    * event creatted by user or not
    */
    readonly isTrusted: boolean
    /**
    *event type default custom
    */
    readonly type: string
    /**
       *event create time
       */
    private timeStamp: number

    /**
    *stop event default prevent or not
    */
    private defaultPrevented: boolean
    /**
    *stop all event
    */
    private immediate: boolean
    /**
    * stop event propagation
    */
    private isPropagation: boolean

    /**
    *event name
    */
    private _name: string

    new(context: EventKit.EventContextOptions, name: string): ClassicEvent;
}

export declare class Notifier {
    private map: Map<string, Set<NotifierKit.NotifyEventCallback<ClassicEvent>>>;
    on(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>): void;
    off(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>): void;
    has(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>): boolean;
    clean(): void
    notify(name: string|ClassicEvent, ...args: Array<NotifierKit.NotiyParams>): void
    new(): Notifier;
}