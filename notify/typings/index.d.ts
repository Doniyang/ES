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
    private map: Map<string, Stack<ClassicEvent>>;
    on(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms): void ;
    off(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms): void 
    has(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms);
    clean(): void
    notify(name: string | ClassicEvent, ...args: Array<NotifierKit.NotiyParams>): void
    new(): Notifier;
}

export declare class Target {
    new(): Target
    execute(evt: T, ...args: Array<NotifierKit.NotiyParams>): void;
    equal(target: this): boolean
    hash(): number
}

export  class Stack<T>{
    new():Stack<T>
   has(target:Target<T>):boolean 
   add(target:Target<T>):void
   delete(target:Target<T>):void
   clear():void
   forEach(evt:T,args: Array<NotifierKit.NotiyParams>,filter:EventKit.EventFilter<T>):void
}