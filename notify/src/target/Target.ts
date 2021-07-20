export default interface Target<T>{
    addEventListener(type: string, handler: NotifierKit.NotifyEventCallback<T>, options?: boolean | EventKit.AddEventListenerParms): void;
    dispatch(event: T,args:Array<NotifierKit.NotiyParams>): boolean;
    removeEventListener(type: string, handler:NotifierKit.NotifyEventCallback<T>, options?: EventKit.EventListenerParams | boolean): void;
}