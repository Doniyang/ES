export default class ClassicEvent {
    constructor(context, name) {
        this.cancelable = false;
        this.bubbles = false;
        this.isTrusted = false;
        this.target = context;
        this.type = 'CustomEvent';
        this.timeStamp = Date.now();
        this.dataset = null;
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
    get data() {
        return this.dataset;
    }
    static set data(value) {
        this.dataset = value;
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
        this.dataset = null;
        this.timeStamp = Date.now();
        this.immediate = false;
        this.defaultPrevented = false;
        this.isPropagation = false;
    }
}
