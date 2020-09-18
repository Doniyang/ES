import isString from "../is/isString"
import isNumber from "../is/isNumber"
import isBoolean from "../is/isBoolean"
import Scope from "./scope/Scope";
import RollProxy from "./RollProxy";
import Context from "./Context";
import Notify from "./notify/Notify";
import RollStart from "./core/RollStart";
import RollStop from "./core/RollStop";
import RollRefresh from "./core/RollRefresh";
import RollFinish from "./core/RollFinish";
import RollMove from "./core/RollMove";
import PrefixStyle from "src/dom/PrefixStyle";
export default class DigitalScroll {
  /**
   * direction lock threshold
   */
  readonly directionLockThreshold: number
  /**
   * set bounce time
   */
  readonly bounceTime: number
  /**
   * deceleration
   */
  readonly deceleration: number


  private preventDefault: boolean

  private useTransition: boolean

  private useTransform: boolean

  private bindToWrapper: boolean

  private scope: Scope;
  private rollProxy: RollProxy;
  private context: Context;
  private notify: Notify;
  constructor(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.scrollOptions) {
    this.directionLockThreshold = 5
    this.bounceTime = 700
    this.deceleration = 0.0015
    this.preventDefault = true
    this.useTransform = true
    this.useTransition = true
    this.bindToWrapper = typeof window.onmousedown === 'undefined';
    this.notify = new Notify()
    this.scope = new Scope(isString(wrapper) ? document.body.querySelector(wrapper) as HTMLElement : wrapper as HTMLElement);
    this.rollProxy = new RollProxy(this.notify);
    this.context = new Context(this.rollProxy);
    this.updateScrollOptions(options);
    this.initializer()
  }

  private updateScrollOptions(options: ScrollKit.scrollOptions) {
    if (isNumber(options.eventPassthrough)) {
      this.scope.setPassthrough(options.eventPassthrough)
    }
    if (isBoolean(options.clickable)) {
      this.scope.setClickable(options.clickable)
    }
    if (isBoolean(options.tap)) {
      this.scope.setTap(options.tap)
    }
    if (isBoolean(options.bounce)) {
      this.scope.setBounce(options.bounce)
    }
    if (isBoolean(options.momentum)) {
      this.scope.setMomentum(options.momentum)
    }

    if (isBoolean(options.HWCompositing)) {
      this.scope.setHWCompositing(options.HWCompositing)
    }

    if (isBoolean(options.preventDefault)) {
      this.preventDefault = options.preventDefault;
    }

    if (isBoolean(options.useTransition)) {
      this.useTransition = options.useTransition
    }

    if (isBoolean(options.useTransform)) {
      this.useTransform = options.useTransform
    }
    if (isBoolean(options.bindToWrapper)) {
      this.bindToWrapper = options.bindToWrapper
    }
    
  }

  private isSupport(e: string, context: any): boolean {
    return e in context
  }

  private isSuportTransform(): boolean {
    return PrefixStyle.has('transform') && this.useTransform
  }

  private isSuportTransition(): boolean {
    return PrefixStyle.has('transition') && this.useTransition
  }

  private isSupportTouch(): boolean {
    return this.isSupport('ontouchstart', window);
  }

  private addEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.addEventListener(type, fn, capture);
  }

  private removeEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.removeEventListener(type, fn, capture)
  }

  private stopPreventDefault(e: Event): void {
    if (this.preventDefault) {
      e.preventDefault()
    }
  }

  private handleStart(e: Event) {
    this.context.setContext('start', RollStart);
    this.stopPreventDefault(e);
    this.context.execute(e)
  }

  private handleStop(e: Event) {
    this.context.setContext('stop', RollStop)
    this.stopPreventDefault(e);
    this.context.execute(e)
  }

  private resize(e: Event) {
    this.context.setContext('resize', RollRefresh);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }
  private handleTransitionEnd(e: Event) {
    this.context.setContext('finish', RollFinish);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }

  private wheel(e: Event) {

  }

  private handleMove(e: Event) {
    this.context.setContext('move', RollMove);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }

  protected handleEvent(e: Event) {
    switch (e.type) {
      case 'touchstart':
      case 'mousedown':
        this.handleStart(e);
        break;
      case 'touchmove':
      case 'mousemove':
        this.handleMove(e);
        break;
      case 'touchend':
      case 'mouseup':
      case 'touchcancel':
      case 'mousecancel':
        this.handleStop(e);
        break;
      case 'orientationchange':
      case 'resize':
        this.resize(e);
        break;
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this.handleTransitionEnd(e);
        break;
      case 'wheel':
      case 'DOMMouseScroll':
      case 'mousewheel':
        this.wheel(e);
        break;
        break;
      case 'click':

        break;

      default:
        break;
    }
  }


  /**
   * addDOMEvents
   */
  private addEvents() {
    this.initEvents(this.addEventListener)
  }

  /**
   * removeDOMEvents
   */
  private removeEvents() {
    this.initEvents(this.removeEventListener)
  }

  /**
   * makeDOMEvents
   */
  private initEvents(listener: Function) {
    const rootElement: HTMLElement = this.scope.getWrapElement();
    const target: HTMLElement | Window = this.bindToWrapper ? rootElement : window;
    listener(window, 'orientationchange', this)
    listener(window, 'resize', this)

    if (this.scope.isClickable()) {
      listener(rootElement, 'click', this, true)
    }
    /**
     * mouse
     *  */
    if (!this.isSupportTouch()) {
      listener(rootElement, 'mousedown', this)
      listener(target, 'mousemove', this)
      listener(target, 'mousecancel', this)
      listener(target, 'mouseup', this)
    }
    /**
     *  touch
     * */
    if (this.isSupportTouch()) {
      listener(rootElement, 'touchstart', this)
      listener(target, 'touchmove', this)
      listener(target, 'touchcancel', this)
      listener(target, 'touchend', this)
    }
    listener(this.scope.getScrollElement(), 'transitionend', this);
    listener(this.scope.getScrollElement(), 'webkitTransitionEnd', this);
    listener(this.scope.getScrollElement(), 'oTransitionEnd', this);
    listener(this.scope.getScrollElement(), 'MSTransitionEnd', this);
  }


  /**
   * initializer
   */
  public initializer() {
    this.addEvents();
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param time 
   * @param ease 
   */
  public scrollTo(x: number, y: number, time: number) {
    this.rollProxy.scrollTo(x,y,time);
  }
}