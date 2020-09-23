import Notification from './Notification';
import ClassicEvent from '../event/ClassicEvent';
export default class Notifier extends Notification<ClassicEvent> {
    private map;
    constructor();
    /**
     * add event listener
     * @param name
     * @param fn
     */
    on(name: string, fn: Callbackable<ClassicEvent>): void;
    /**
     * remove event listener
     * @param name
     * @param fn
     */
    off(name: string, fn?: Callbackable<ClassicEvent>): void;
    /**
     * event listener or not
     * @param name
     * @param fn
     */
    has(name: string, fn?: Callbackable<ClassicEvent>): boolean;
    /**
    * clear all event
    */
    clean(): void;
    /**
     * fire event hander
     * @param evt
     * @param args
     */
    notify(evt: string | ClassicEvent, ...args: Array<argsOption>): void;
    /**
     * hander event
     * @param evt
     * @param fnset
     * @param args
     */
    dispatch(evt: ClassicEvent, fnset: Set<Callbackable<ClassicEvent>>, args: Array<argsOption>): void;
}
