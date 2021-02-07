/** 
  *the classic event object
  *create:2020/3/13
  *author:niyang
  */
import Eventable from './Eventable'
export default class ClassicEvent implements Eventable {
  /*
   *  event  exist in DOM or not
   */
  readonly bubbles: boolean
  /*
  * event can cancel or not
  */
  readonly cancelable: boolean
  /**
  * event target
  */
  readonly target: EventKit.EventContextOptions
  /**
  * event creatted by user or not
  */
  readonly isTrusted: boolean
  /**
  *event type default custom
  */
  readonly type: string
  /**
     *event create time
     */
  private timeStamp: number

  /**
  *stop event default prevent or not
  */
  private defaultPrevented: boolean
  /**
  *stop all event
  */
  private immediate: boolean
  /**
  * stop event propagation
  */
  private isPropagation: boolean

  /**
  *event name
  */
  private _name: string

  constructor(context: EventKit.EventContextOptions, name: string) {
    this.cancelable = false
    this.bubbles = false
    this.isTrusted = false
    this.target = context
    this.type = 'CustomEvent'
    this.timeStamp = Date.now()
    this.defaultPrevented = false
    this.immediate = false
    this.isPropagation = false
    this._name = name
  }

  /**
  *  get isPropagation value
  */
  get isStopPropagation() {
    return this.isPropagation
  }
  /**
  * get immediate value
  */
  get isStopImmediatePropagation() {
    return this.immediate
  }

  get name(): string {
    return this._name
  }


  /**
   * stop  event default
   */
  public preventDefault() {
    this.defaultPrevented = true
  }

  /**
     * stop all event
     */
  public stopImmediatePropagation() {
    this.immediate = true
  }

  /**
   * sop event progation
   */
  public stopPropagation() {
    this.isPropagation = true
  }

  /**
    *set event as default
    */
  public reset() {
    this.timeStamp = Date.now()
    this.immediate = false
    this.defaultPrevented = false
    this.isPropagation = false
    return this
  }

  /**
   * 
   * @param context 
   * @param event
   */

  public static ensure(context: EventKit.EventContextOptions, event:  null|string | ClassicEvent): ClassicEvent {
    if ((event instanceof ClassicEvent && event.name == null) || event == null) {
      throw new Error("Notify event name cannot be null");
    }
    if (event instanceof ClassicEvent) return event.reset();
    return new ClassicEvent(context, event);
  }
}