import Notification from './Notification'
import ClassicEvent from '../event/ClassicEvent';

export default class Notifier extends Notification {
  private map: EventMapOptions<string, MapSetOptions<string>>;
  constructor() {
    super();
    this.map = new Map();
  }
  /**
   * add event listener
   * @param name 
   * @param fn 
   * @param dataset 
   */
  on(name: string, fn: toolkit.fnOption, dataset?: toolkit.mulitOption): void {
    let set: MapSetOptions<string> | undefined = this.map.get(name);
    const opts: NotifierOptions = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
    if (set === undefined) { this.map.set(name, set = new Set<string>()) }
    set.add(JSON.stringify(opts))
  }
/**
 * remove event listener
 * @param name 
 * @param fn 
 * @param dataset 
 */
  off(name: string, fn?: toolkit.fnOption, dataset?: toolkit.mulitOption): void {
    if (fn === undefined) { this.map.delete(name); return void}
    const set: MapSetOptions<string> | undefined = this.map.get(name)
    if (!!set) {
      const opts: NotifierOptions = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
      set.delete(JSON.stringify(opts))
    }
  }
  /**
   * event listener or not
   * @param name 
   * @param fn 
   * @param dataset 
   */
  has(name: string, fn: toolkit.fnOption, dataset?: toolkit.mulitOption): boolean {
    if (this.map.has(name)) {
      const opts: NotifierOptions = !!dataset ? ({ dataset: dataset, fn: fn }) : ({ fn: fn });
      const set: MapSetOptions<string> | undefined = this.map.get(name)
      if (set === undefined) {return false}
      return (set as MapSetOptions<string>).has(JSON.stringify(opts));
    } else {
      return false
    }
  }
  /**
  * clear all event
  */
  clean() {
    this.map.forEach((set:MapSetOptions<string>)=>{
      set.clear()
    })
    this.map.clear()
  }
  /**
   * fire event hander
   * @param name 
   * @param args 
   */
  notify(name: string, ...args: Array<toolkit.mulitOption>) {
    if (this.map.has(name)) {
      let event: ClassicEvent = new ClassicEvent(this, name)
      let sets: MapSetOptions<string> | undefined = this.map.get(name)
      if (!event.isStopImmediatePropagation) {
        this.dispatch(event, sets as MapSetOptions<string>, args)
      }
    }
  }
  /**
   * hander event
   * @param evt 
   * @param fnset 
   * @param args 
   */
  dispatch(evt: ClassicEvent, fnset: MapSetOptions<string>, args: Array<toolkit.mulitOption>): void {
    for (let notifierStr of fnset) {
      let notifier = JSON.parse(notifierStr)
      if (notifier.dataset) { evt.data = notifier.dataset }
      notifier.fn.apply(this, [evt, ...args])
      if (evt.isStopPropagation) break;
    }
  }

}