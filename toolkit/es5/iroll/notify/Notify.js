import Notifier from "../../notify/Notifier";
export default class Notify {
    constructor() {
        this.notify = new Notifier();
    }
    on(name, fn) {
        this.notify.on(name, fn);
    }
    off(name, fn) {
        this.notify.off(name, fn);
    }
    trigger(e, ...args) {
        this.notify.notify(e, args);
    }
}
