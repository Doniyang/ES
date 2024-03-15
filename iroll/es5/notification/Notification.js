import { Notifier } from '@niyang-es/notify';
export default class Notification {
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
        this.notify.notify(e, ...args);
    }
    destory() {
        this.notify.clean();
    }
}
