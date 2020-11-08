export default class ClassicEvent {
    constructor(context, name) {
        this.cancelable = false;
        this.bubbles = false;
        this.isTrusted = false;
        this.target = context;
        this.type = 'CustomEvent';
        this.timeStamp = Date.now();
        this.defaultPrevented = false;
        this.immediate = false;
        this.isPropagation = false;
        this._name = name;
    }
    /**
    *  get isPropagation value
    */
    get isStopPropagation() {
        return this.isPropagation;
    }
    /**
    * get immediate value
    */
    get isStopImmediatePropagation() {
        return this.immediate;
    }
    get name() {
        return this._name;
    }
    /**
     * stop  event default
     */
    preventDefault() {
        this.defaultPrevented = true;
    }
    /**
       * stop all event
       */
    stopImmediatePropagation() {
        this.immediate = true;
    }
    /**
     * sop event progation
     */
    stopPropagation() {
        this.isPropagation = true;
    }
    /**
      *set event as default
      */
    reset() {
        this.timeStamp = Date.now();
        this.immediate = false;
        this.defaultPrevented = false;
        this.isPropagation = false;
        return this;
    }
    /**
     *
     * @param context
     * @param event
     */
    static ensure(context, event) {
        if ((event instanceof ClassicEvent && event.name == null) || event == null) {
            throw new Error("Notify event name cannot be null");
        }
        if (event instanceof ClassicEvent)
            return event.reset();
        return new ClassicEvent(context, event);
    }
}
