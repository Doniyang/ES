import { ClassicEvent, Notifier } from '@niyang-es/notify';

export default class Notify {
    private notify: Notifier

    constructor() {
        this.notify = new Notifier()
    }

    public on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.on(name, fn)
    }

    public off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void {
        this.notify.off(name, fn)
    }

    public trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void {
        this.notify.notify(e, args)
    }
}