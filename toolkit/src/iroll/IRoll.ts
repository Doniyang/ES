import isString from "../is/isString"
import isNumber from "../is/isNumber"
import isBoolean from "../is/isBoolean"
import Notifier from "src/notify/Notifier"
import ParametricSerializer from './ParametricSerializer';
import ContextDigitalizer from "./ContextDigitalizer";
import TouchStartDigitalizer from "./TouchStartDigitalizer";
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
   * momentum limit time
   */
  readonly momentumLimitTime: number
  /**
   * momentum limit distance
   */
  readonly momentumLimitDistance: number
  /**
   * swipe time
   */
  readonly swipeTime: number
  /**
   * swipe bounce time
   */
  readonly swipeBounceTime: number
  /**
   * deceleration
   */
  readonly deceleration: number
  /**
   * flick limit time
   */
  readonly flickLimitTime: number
  /**
   * flick limit distance
   */
  readonly flickLimitDistance: number
  /**
   * resize polling
   */
  readonly resizePolling: number

  /**
   * allow x scroll or not
   */
  private scrollX: boolean
  /**
   * allow y scroll or not
   */
  private scrollY: boolean
  /**
   * allow x/y scroll or not
   */
  private freeScroll: boolean
  /**
   * event pass through
   * 1 axis y
   * 0 axis x
   * -1 none
   */
  private eventPassthrough: ParametricSerializer<number>
  /**
   * clickable
   */
  private clickable: ParametricSerializer<boolean>
  /**
   * tap
   */
  private tap: ParametricSerializer<boolean>
  /**
   * bounce
   */
  private bounce: ParametricSerializer<boolean>
  /**
   * momentum
   */
  private momentum: ParametricSerializer<boolean>
  /**
   * probe
   */
  private probe: ParametricSerializer<number>
  /**
   * prevent default
   */
  private preventDefault: ParametricSerializer<boolean>
  /**
   * prevent default exception
   */
  private preventDefaultFilter: ScrollKit.ElementFilter
  /**
   * use tramformZ
   */
  private HWCompositing: ParametricSerializer<boolean>
  /**
   * use transition
   */
  private useTransition: ParametricSerializer<boolean>
  /**
   * use transform
   */
  private useTransform: ParametricSerializer<boolean>
  /**
   * bind to wrapper
   */
  private bindToWrapper: ParametricSerializer<boolean>
  /**
   * scroll element
   */
  private scrollingElement: HTMLElement | null

  private scrollWrapElement: HTMLElement | null


  private enable: boolean

  private notify: Notifier
  
  private context:ContextDigitalizer
  constructor(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.scrollOptions) {
    this.scrollWrapElement = isString(wrapper) ? document.querySelector(wrapper as string) : (wrapper as HTMLElement)
    this.directionLockThreshold = 5
    this.bounceTime = 700
    this.momentumLimitTime = 300
    this.momentumLimitDistance = 15
    this.swipeTime = 2500
    this.swipeBounceTime = 500
    this.deceleration = 0.001
    this.flickLimitTime = 200
    this.flickLimitDistance = 100
    this.resizePolling = 60
    
    this.eventPassthrough = new ParametricSerializer<number>(-1);
    this.clickable = new ParametricSerializer(false);
    this.tap = new ParametricSerializer<boolean>(false)
    this.bounce = new ParametricSerializer<boolean>(true)
    this.momentum = new ParametricSerializer<boolean>(true);
    this.probe = new ParametricSerializer<number>(0)
    this.preventDefault = new ParametricSerializer<boolean>(true)
    this.preventDefaultFilter = options.preventDefaultFilter || function(el:HTMLElement):boolean{ return /^(INPUT|TEXTAREA|BUTTON|SELECT)$/.test(el.tagName)}
    this.HWCompositing = new ParametricSerializer<boolean>(true)
    this.useTransition = new ParametricSerializer<boolean>(true)
    this.useTransform = new ParametricSerializer<boolean>(true)
    this.bindToWrapper = new ParametricSerializer<boolean>(this.isSupportMouseEvent())
    /*this.scrollingElement = (this.scrollWrapElement as HTMLElement).firstChild*/
    this.context = new ContextDigitalizer();
    this.updateScrollOptions(options);
    this.initializer();
  }

  private updateScrollOptions(options: ScrollKit.scrollOptions) {
    if (isNumber(options.eventPassthrough)) {
      this.eventPassthrough.setProperty(options.eventPassthrough)
    }
    if (isBoolean(options.clickable)) {
      this.clickable.setProperty(options.clickable)
    }
    if (isBoolean(options.tap)) {
      this.tap.setProperty(options.tap)
    }
    if (isBoolean(options.bounce)) {
      this.bounce.setProperty(options.bounce)
    }
    if (isBoolean(options.momentum)) {
      this.momentum.setProperty(options.momentum)
    }
    if (isNumber(options.probe)) {
      this.probe.setProperty(options.probe)
    }

    if (isBoolean(options.preventDefault)) {
      this.preventDefault.setProperty(options.preventDefault);
    }
    if (isBoolean(options.HWCompositing)) {
      this.HWCompositing.setProperty(options.HWCompositing)
    }
    if (isBoolean(options.useTransition)) {
      this.useTransition.setProperty(options.useTransition)
    }

    if (isBoolean(options.useTransform)) {
      this.useTransform.setProperty(options.useTransform)
    }
    if (isBoolean(options.bindToWrapper)) {
      this.bindToWrapper.setProperty(options.bindToWrapper)
    }
  }

  private isSupport(e: string, context: any): boolean {
    return e in context
  }

  private isSupportMouseEvent(): boolean {
    return this.isSupport('onmousedown', window);
  }

  private isSupportPointer(): boolean {
    return this.isSupport('PointerEvent', window) || this.isSupport('MSPointerEvent', window)
  }

  private isSuportPerspective(): boolean {
    return this.isSupport(this.prefixStyle('perspective'), this.pseudo().style)
  }

  private isSuportTransform(): boolean {
    return this.isSupport(this.prefixStyle('transform'), this.pseudo().style) && this.useTransform.value()
  }

  private isSuportTransition(): boolean {
    return this.isSupport(this.prefixStyle('transition'), this.pseudo().style) && this.useTransition.value() 
  }

  private isSupportTouch(): boolean {
    return this.isSupport('ontouchstart', window);
  }
 
  private on(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.addEventListener(type, fn, capture);
  }

  private off(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.removeEventListener(type, fn, capture)
  }

  private handleStart(e: Event) {
    this.context.setContext(TouchStartDigitalizer);
    this.context.execute(e) 
  }

  private handleStop(e: Event) {

  }

  private resize(e: Event) {

  }
  private handleTransitionEnd(e: Event) {

  }

  private wheel(e: Event) {

  }

  private handleMove(e: Event) { }

  private handleKey(e: Event) {

  }

  protected handleEvent(e: Event) {
    switch (e.type) {
      case 'touchstart':
      case 'pointerdown':
      case 'MSPointerDown':
      case 'mousedown':
        this.handleStart(e);
        break;
      case 'touchmove':
      case 'pointermove':
      case 'MSPointerMove':
      case 'mousemove':
        this.handleMove(e);
        break;
      case 'touchend':
      case 'pointerup':
      case 'MSPointerUp':
      case 'mouseup':
      case 'touchcancel':
      case 'pointercancel':
      case 'MSPointerCancel':
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
      case 'keydown':
        this.handleKey(e);
        break;
      case 'click':

        break;

      default:
        break;
    }
  }

  /**
   * initializer
   */
  public initializer() {
    this.addDOMEvents();
    this.refresh()
  }

  /**
   * addDOMEvents
   */
  public addDOMEvents() {
    this.makeDOMEvents(this.on)
  }

  /**
   * removeDOMEvents
   */
  public removeDOMEvents() {
    this.makeDOMEvents(this.off)
  }

  /**
   * makeDOMEvents
   */
  public makeDOMEvents(listener: Function) {
    const target = this.bindToWrapper.value() ? this.scrollWrapElement : window
    listener(window, 'orientationchange', this)
    listener(window, 'resize', this)

    if (this.clickable) {
      listener(this.scrollWrapElement, 'click', this, true)
    }
    /**
     * mouse
     *  */
    if (this.isSupportMouseEvent()) {
      listener(this.scrollWrapElement, 'mousedown', this)
      listener(target, 'mousemove', this)
      listener(target, 'mousecancel', this)
      listener(target, 'mouseup', this)
    }
    /**
     *  touch
     * */
    if (this.isSupportTouch()) {
      listener(this.scrollWrapElement, 'touchstart', this)
      listener(target, 'touchmove', this)
      listener(target, 'touchcancel', this)
      listener(target, 'touchend', this)
    }

    listener(this.scrollingElement, 'transitionEnd', this)
  }

  /**
   * refresh
   */  
  public refresh() {

  }

  /**
   * 
   * @param x 
   * @param y 
   * @param time 
   * @param ease 
   */
  public scrollTo(x: number, y: number, time?: number, ease?: iRoll.Anmation) {

  }

}