import Notification from './Notification';
import ClassicEvent from '../event/ClassicEvent';
export default class Notifier extends Notification {
    constructor() {
        super();
        this.map = new Map();
    }
    on(name, fn, dataset) {
        const set = this.map.get(name);
        const opts = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
        if (set === undefined) {
            this.map.set(name, set = new Set());
        }
        set.add(JSON.stringify(opts));
    }
    off(name, fn, dataset) {
        if (fn === undefined) {
            return this.map.delete(name);
        }
        const set = this.map.get(name);
        if (!!set) {
            const opts = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
            set.delete(JSON.stringify(opts));
        }
    }
    has(name, fn, dataset) {
        if (this.map.has(name)) {
            const opts = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
            const set = this.map.get(name);
            return set.has(JSON.stringify(op));
        }
        else {
            return false;
        }
    }
    /**
    * clear all event
    */
    clean() {
        this.map.clear();
    }
    notify(name, ...args) {
        if (this.map.has(name)) {
            let event = new ClassicEvent(this, name);
            let sets = this.map.get(name);
            if (!event.isisStopImmediatePropagation) {
                this.dispatch(event, sets, args);
            }
        }
    }
    dispatch(evt, fnset, args) {
        for (let notifierStr of fnset) {
            let notifier = JSON.parse(notifierStr);
            if (notifier.dataset) {
                event.data = notifier.dataset;
            }
            notifier.fn.apply(this, [event, ...args]);
            if (event.isStopPropagation)
                break;
        }
    }
}
