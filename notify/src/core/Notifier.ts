import Notification from './Notification'
import ClassicEvent from '../event/ClassicEvent';
import Stack from './Stack';
import Target from './Target';
import { isBoolean } from '@niyang-es/toolkit';

export default class Notifier extends Notification<ClassicEvent> {
  private map: Map<string, Stack<ClassicEvent>>;
  constructor() {
    super();
    this.map = new Map();
  }

  private parse(options?:boolean|EventKit.AddEventListenerParms):EventKit.AddEventListenerParms|undefined{
     if(isBoolean(options)){
       return {capture:options}
     } else{
       return options
     }   
  }
  /**
   * add event listener
   * @param name 
   * @param fn  
   */
  on(name: string, fn: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms): void {
    let set: Stack<ClassicEvent>| undefined = this.map.get(name);
    if (set === undefined) { this.map.set(name, set = new Stack<ClassicEvent>()) }
    set.add(new Target<ClassicEvent>(fn,this.parse(options)))     
  }
  /**
   * remove event listener
   * @param name 
   * @param fn
   */
  off(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms): void {
    if (fn === undefined) { this.map.delete(name); return; }
    const set: Stack<ClassicEvent> | undefined = this.map.get(name)
    if (!!set) {set.remove(fn,this.parse(options)) }
  }
  /**
   * event listener or not
   * @param name 
   * @param fn 
   */
  has(name: string, fn?: NotifierKit.NotifyEventCallback<ClassicEvent>,options?:boolean|EventKit.AddEventListenerParms): boolean {
    if(this.map.has(name)){
          if(fn){
              return !!this.map.get(name)?.includes(fn,this.parse(options))  
          }else{
            return true
          }
    } else{
      return false
    }
  }
  /**
  * clear all event
  */
  clean(): void {
    this.map.forEach((set: Stack<ClassicEvent>) => {set.clear()})
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
      let set: Stack<ClassicEvent> = this.map.get(event.name) as Stack<ClassicEvent> 
      if (!event.isStopImmediatePropagation) {
        this.dispatch(event, set, args)
      }
    }
  }
  /**
   * hander event
   * @param evt 
   * @param fnset 
   * @param args 
   */
  dispatch(evt: ClassicEvent, stack:Stack<ClassicEvent>, args: Array<NotifierKit.NotiyParams>): void {
    stack.forEach(evt,args,e=>!e.isStopPropagation)
  }
}