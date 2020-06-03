import Notification from './Notification';
import ClassicEvent from '../event/ClassicEvent';
export default class Notifier extends Notification {
    constructor() {
        super();
        this.map = new Map();
    }
    /**
     * add event listener
     * @param name
     * @param fn
     */
    on(name, fn) {
        let set = this.map.get(name);
        if (set === undefined) {
            this.map.set(name, set = new Set());
        }
        set.add(fn);
    }
    /**
     * remove event listener
     * @param name
     * @param fn
     */
    off(name, fn) {
        if (fn === undefined) {
            this.map.delete(name);
            return;
        }
        const set = this.map.get(name);
        if (!!set) {
            set.delete(fn);
        }
    }
    /**
     * event listener or not
     * @param name
     * @param fn
     */
    has(name, fn) {
        if (this.map.has(name)) {
            const set = this.map.get(name);
            if (set === undefined) {
                return false;
            }
            return set.has(fn);
        }
        else {
            return false;
        }
    }
    /**
    * clear all event
    */
    clean() {
        this.map.forEach((set) => {
            set.clear();
        });
        this.map.clear();
    }
    /**
     * fire event hander
     * @param name
     * @param args
     */
    notify(name, ...args) {
        if (this.map.has(name)) {
            let event = new ClassicEvent(this, name);
            let set = this.map.get(name);
            if (!event.isStopImmediatePropagation) {
                this.dispatch(event, set, args);
            }
        }
    }
    /**
     * hander event
     * @param evt
     * @param fnset
     * @param args
     */
    dispatch(evt, fnset, args) {
        for (let fn of fnset) {
            fn.apply(this, [evt, ...args]);
            if (evt.isStopPropagation)
                break;
        }
    }
}
