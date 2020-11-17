/**
  *the classic event object
  *create:2020/3/13
  *author:niyang
  */
import Eventable from './Eventable';
export default class ClassicEvent implements Eventable {
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    /**
    * event target
    */
    readonly target: EventKit.EventContextOptions;
    /**
    * event creatted by user or not
    */
    readonly isTrusted: boolean;
    /**
    *event type default custom
    */
    readonly type: string;
    /**
       *event create time
       */
    private timeStamp;
    /**
    *stop event default prevent or not
    */
    private defaultPrevented;
    /**
    *stop all event
    */
    private immediate;
    /**
    * stop event propagation
    */
    private isPropagation;
    /**
    *event name
    */
    private _name;
    constructor(context: EventKit.EventContextOptions, name: string);
    /**
    *  get isPropagation value
    */
    get isStopPropagation(): boolean;
    /**
    * get immediate value
    */
    get isStopImmediatePropagation(): boolean;
    get name(): string;
    /**
     * stop  event default
     */
    preventDefault(): void;
    /**
       * stop all event
       */
    stopImmediatePropagation(): void;
    /**
     * sop event progation
     */
    stopPropagation(): void;
    /**
      *set event as default
      */
    reset(): this;
    /**
     *
     * @param context
     * @param event
     */
    static ensure(context: EventKit.EventContextOptions, event: null | string | ClassicEvent): ClassicEvent;
}
