import Notification from './Notification'
import ClassicEvent from '../event/ClassicEvent';

export default class Notifier extends Notification<ClassicEvent> {
  private map: Map<string, Set<Callbackable<ClassicEvent>>>;
  constructor() {
    super();
    this.map = new Map();
  }
  /**
   * add event listener
   * @param name 
   * @param fn  
   */
  on(name: string, fn: Callbackable<ClassicEvent>): void {
    let set: Set<Callbackable<ClassicEvent>> | undefined = this.map.get(name);
    if (set === undefined) { this.map.set(name, set = new Set<Callbackable<ClassicEvent>>()) }
    (set as Set<Callbackable<ClassicEvent>>).add(fn)
  }
  /**
   * remove event listener
   * @param name 
   * @param fn
   */
  off(name: string, fn?: Callbackable<ClassicEvent>): void {
    if (fn === undefined) { this.map.delete(name); return; }
    const set: Set<Callbackable<ClassicEvent>> | undefined = this.map.get(name)
    if (!!set) {
      (set as Set<Callbackable<ClassicEvent>>).delete((fn as Callbackable<ClassicEvent>))
    }
  }
  /**
   * event listener or not
   * @param name 
   * @param fn 
   */
  has(name: string, fn?: Callbackable<ClassicEvent>): boolean {
    if (fn) {
      if (this.map.has(name)) {
        const set: Set<Callbackable<ClassicEvent>> | undefined = this.map.get(name)
        if (set === undefined) { return false }
        return (set as Set<Callbackable<ClassicEvent>>).has(fn);
      } else {
        return false
      }
    } else {
      return this.map.has(name);
    }
  }
  /**
  * clear all event
  */
  clean(): void {
    this.map.forEach((set: Set<Callbackable<ClassicEvent>>) => {
      set.clear()
    })
    this.map.clear()
  }
  /**
   * fire event hander
   * @param evt 
   * @param args 
   */
  notify(evt: string | ClassicEvent, ...args: Array<argsOption>) {
    let event: ClassicEvent = ClassicEvent.ensure(this, evt)
    if (this.has(event.name)) {
      let set: Set<Callbackable<ClassicEvent>> | undefined = this.map.get(event.name)
      if (!event.isStopImmediatePropagation) {
        this.dispatch(event, set as Set<Callbackable<ClassicEvent>>, args)
      }
    }
  }
  /**
   * hander event
   * @param evt 
   * @param fnset 
   * @param args 
   */
  dispatch(evt: ClassicEvent, fnset: Set<Callbackable<ClassicEvent>>, args: Array<argsOption>): void {
    for (let fn of fnset) {
      fn.apply(this, [evt, ...args])
      if (evt.isStopPropagation) break;
    }
  }

}