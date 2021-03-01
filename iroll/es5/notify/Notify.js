import { Notifier } from '@niyang-es/notify';
/**
 * @class Notify
 * @classdesc costom event
 * @author niyang
 */
export default class Notify {
    constructor() {
        this.notify = new Notifier();
    }
    /**
     * @method on
     * @param name
     * @param fn
     * @description register a notification
     */
    on(name, fn) {
        this.notify.on(name, fn);
    }
    /**
     * @method off
     * @param name
     * @param fn
     * @description remove notification
     */
    off(name, fn) {
        this.notify.off(name, fn);
    }
    /**
     * @method  trigger
     * @param e
     * @param args
     * @description dispatch a notification
     */
    trigger(e, ...args) {
        this.notify.notify(e, args);
    }
}
