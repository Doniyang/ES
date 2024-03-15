import {ClassicEvent, Notifier} from '@niyang-es/notify';

/**
 * @class Notification
 * @classdesc costom event
 * @author niyang
 */
export default class Notification {
    /**
     * @name Notification
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
    public on(name: string, fn: RollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.on(name, fn)
    }

    /**
     * @method off
     * @param name
     * @param fn
     * @description remove notification
     */
    public off(name: string, fn?: RollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.off(name, fn)
    }

    /**
     * @method  trigger
     * @param e
     * @param args
     * @description dispatch a notification
     */
    public trigger(e: string | ClassicEvent, ...args: Array<RollKit.NotifyParams>): void {
        this.notify.notify(e, ...args)
    }
    /**
     * @method destory
     */
    public destory():void {
        this.notify.clean()
    }
}
