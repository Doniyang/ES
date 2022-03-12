import Notification from './Notification';
import ClassicEvent from '../event/ClassicEvent';
import Stack from './Stack';
import Target from './Target';
import { isBoolean } from 'node_modules/@niyang-es/toolkit/typings/index';
export default class Notifier extends Notification {
    constructor() {
        super();
        this.map = new Map();
    }
    parse(options) {
        if (isBoolean(options)) {
            return { capture: options };
        }
        else {
            return options;
        }
    }
    /**
     * add event listener
     * @param name
     * @param fn
     */
    on(name, fn, options) {
        let set = this.map.get(name);
        if (set === undefined) {
            this.map.set(name, set = new Stack());
        }
        set.add(new Target(fn, this.parse(options)));
    }
    /**
     * remove event listener
     * @param name
     * @param fn
     */
    off(name, fn, options) {
        if (fn === undefined) {
            this.map.delete(name);
            return;
        }
        const set = this.map.get(name);
        if (!!set) {
            set.delete(new Target(fn, this.parse(options)));
        }
    }
    /**
     * event listener or not
     * @param name
     * @param fn
     */
    has(name, fn, options) {
        var _a;
        if (this.map.has(name)) {
            if (fn) {
                return !!((_a = this.map.get(name)) === null || _a === void 0 ? void 0 : _a.has(new Target(fn, this.parse(options))));
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    /**
    * clear all event
    */
    clean() {
        this.map.forEach((set) => { set.clear(); });
        this.map.clear();
    }
    /**
     * fire event hander
     * @param evt
     * @param args
     */
    notify(evt, ...args) {
        let event = ClassicEvent.ensure(this, evt);
        if (this.has(event.name)) {
            let set = this.map.get(event.name);
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
    dispatch(evt, stack, args) {
        stack.forEach(evt, args, e => !e.isStopPropagation);
    }
}
