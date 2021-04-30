import {ClassicEvent, Notifier} from '@niyang-es/notify';

/**
 * @class Notify
 * @classdesc costom event
 * @author niyang
 */
export default class Notify {
    /**
     * @name notify
     */
    private notify: Notifier

    constructor() {
        this.notify = new Notifier()
    }

    /**
     * @method on
     * @param name
     * @param fn
     * @description register a notification
     */
    public on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.on(name, fn)
    }

    /**
     * @method off
     * @param name
     * @param fn
     * @description remove notification
     */
    public off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.off(name, fn)
    }

    /**
     * @method  trigger
     * @param e
     * @param args
     * @description dispatch a notification
     */
    public trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void {
        this.notify.notify(e, args)
    }
}
