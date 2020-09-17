import ClassicEvent from "../../event/ClassicEvent";
import Notifier from "../../notify/Notifier";

export default class Notify {
    private notify: Notifier

    constructor() {
        this.notify = new Notifier()
    }

    public on(name: string, fn: Callbackable<ClassicEvent>): void {
        this.notify.on(name, fn)
    }

    public off(name: string, fn?: Callbackable<ClassicEvent>): void {
        this.notify.off(name, fn)
    }

    public trigger(e: string | ClassicEvent, ...args: Array<argsOption>): void {
        this.notify.notify(e, args)
    }
}