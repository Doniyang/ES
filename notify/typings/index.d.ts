export declare class ClassicEvent{
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
  
    new(context: EventKit.EventContextOptions, name: string):ClassicEvent;
}

export declare class Notifier <T>{
    private map: Map<string, Set<NotifierKit.NotifyEventCallback<T>>>;
    new():Notifier<T>;
}