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
        this.name = name;
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
    }
}
