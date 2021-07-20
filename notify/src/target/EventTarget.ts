import { isBoolean } from '@niyang-es/toolkit';
import Target from "./Target";

export default class EventTarget<T> implements Target<T>{
    private hashMap: Map<string, Array<Array<NotifierKit.NotifyEventCallback<T> | EventKit.AddEventListenerParms>>>
    constructor() {
        this.hashMap = new Map()
    }

    private has(type: string) {
        return this.hashMap.has(type)
    }

    private parse(options: boolean | EventKit.AddEventListenerParms): EventKit.AddEventListenerParms {
        if (isBoolean(options)) {
            return { capture: true }
        } else {
            return { capture: !!(options as EventKit.AddEventListenerParms).capture, once: !!(options as EventKit.AddEventListenerParms).once, passive: !!(options as EventKit.AddEventListenerParms).passive }
        }
    }

    addEventListener(type: string, handler: NotifierKit.NotifyEventCallback<T>, options?: boolean | EventKit.AddEventListenerParms): void {
        const handerList: Array<NotifierKit.NotifyEventCallback<T> | EventKit.AddEventListenerParms> = [handler, this.parse(options || true)]
        const listenerList: Array<Array<NotifierKit.NotifyEventCallback<T> | EventKit.AddEventListenerParms>> = this.hashMap.get(type) || [];
        listenerList.push(handerList)
        this.hashMap.set(type, listenerList)
    }
    dispatch(event: T, args: NotifierKit.NotiyParams[]): boolean {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type: string, handler: NotifierKit.NotifyEventCallback<T>, options?: boolean | EventKit.EventListenerParams): void {
        ;
    }

}