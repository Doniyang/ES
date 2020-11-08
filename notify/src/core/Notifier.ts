import Notification from './Notification'
import ClassicEvent from '../event/ClassicEvent';

export default class Notifier extends Notification<ClassicEvent> {
  private map: Map<string, Set<NotifierKit.NotifyEventCallback<ClassicEvent>>>;
  constructor() {
    super();
    this.map = new Map();
  }
  /**
   * add event listener
   * @param name 
   * @param fn  
   */
  on(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>): void {
    let set: Set<NotifierKit.NotifyEventCallback<ClassicEvent>> | undefined = this.map.get(name);
    if (set === undefined) { this.map.set(name, set = new Set<NotifierKit.NotifyEventCallback<ClassicEvent>>()) }
    (set as Set<NotifierKit.NotifyEventCallback<ClassicEvent>>).add(fn)
  }
  /**
   * remove event listener
   * @param name 
   * @param fn
   */
  off(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>): void {
    if (fn === undefined) { this.map.delete(name); return; }
    const set: Set<NotifierKit.NotifyEventCallback<ClassicEvent>> | undefined = this.map.get(name)
    if (!!set) {
      (set as Set<NotifierKit.NotifyEventCallback<ClassicEvent>>).delete((fn as NotifierKit.NotifyEventCallback<ClassicEvent>))
    }
  }
  /**
   * event listener or not
   * @param name 
   * @param fn 
   */
  has(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>): boolean {
    if (fn) {
      if (this.map.has(name)) {
        const set: Set<NotifierKit.NotifyEventCallback<ClassicEvent>> | undefined = this.map.get(name)
        if (set === undefined) { return false }
        return (set as Set<NotifierKit.NotifyEventCallback<ClassicEvent>>).has(fn);
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
    this.map.forEach((set: Set<NotifierKit.NotifyEventCallback<ClassicEvent>>) => {
      set.clear()
    })
    this.map.clear()
  }
  /**
   * fire event hander
   * @param evt 
   * @param args 
   */
  notify(evt: string | ClassicEvent, ...args: Array<NotifierKit.NotiyParams>) {
    let event: ClassicEvent = ClassicEvent.ensure(this, evt)
    if (this.has(event.name)) {
      let set: Set<NotifierKit.NotifyEventCallback<ClassicEvent>> | undefined = this.map.get(event.name)
      if (!event.isStopImmediatePropagation) {
        this.dispatch(event, set as Set<NotifierKit.NotifyEventCallback<ClassicEvent>>, args)
      }
    }
  }
  /**
   * hander event
   * @param evt 
   * @param fnset 
   * @param args 
   */
  dispatch(evt: ClassicEvent, fnset: Set<NotifierKit.NotifyEventCallback<ClassicEvent>>, args: Array<NotifierKit.NotiyParams>): void {
    for (let fn of fnset) {
      fn.apply(this, [evt, ...args])
      if (evt.isStopPropagation) break;
    }
  }

}