import isString from "../is/isString"
import isNumber from "../is/isNumber"
import isBoolean from "../is/isBoolean"
import Notifier from "src/notify/Notifier"

export default class Roll {
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
   * x roll start 
   */
  private startX: number
  /**
   * y roll start
   */
  private startY: number
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
  private eventPassthrough: number
  /**
   * clickable
   */
  private clickable: boolean
  /**
   * tap
   */
  private tap: boolean
  /**
   * bounce
   */
  private bounce: boolean
  /**
   * momentum
   */
  private momentum: boolean
  /**
   * probe
   */
  private probe: number
  /**
   * prevent default
   */
  private preventDefault: boolean
  /**
   * prevent default exception
   */
  private preventDefaultException: object
  /**
   * use tramformZ
   */
  private HWCompositing: boolean
  /**
   * use transition
   */
  private useTransition: boolean
  /**
   * use transform
   */
  private useTransform: boolean
  /**
   * bind to wrapper
   */
  private bindToWrapper: boolean
  /**
   * scroll element
   */
  private scrollingElement: ChildNode  | null

  private scrollWrapElement: HTMLElement | null


  private enable: boolean

  private notify:Notifier
  
  private wrapOffset:iRoll.Offset

  private scrollOffset:iRoll.Offset

  private axis:iRoll.Point
  constructor(wrapper: iRoll.elwrap, options: iRoll.rollOptions) {
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
    this.startX = isNumber(options.startX) ? options.startX as number : 0
    this.startY = isNumber(options.startY) ? options.startY as number : 0
    this.scrollX = isBoolean(options.scrollX) ? options.scrollX as boolean : false
    this.scrollY = isBoolean(options.scrollY) ? options.scrollY as boolean : true
    this.freeScroll = isBoolean(options.freeScroll) ? options.freeScroll as boolean : false
    this.eventPassthrough = isNumber(options.eventPassthrough) ? options.eventPassthrough as number : -1
    this.clickable = isBoolean(options.clickable) ? options.clickable as boolean : false
    this.tap = isBoolean(options.tap) ? options.tap as boolean : false
    this.bounce = isBoolean(options.bounce) ? options.bounce as boolean : true
    this.momentum = isBoolean(options.momentum) ? options.momentum as boolean : true
    this.probe = isNumber(options.probe) ? options.probe as number : 0
    this.preventDefault = isBoolean(options.preventDefault) ? options.preventDefault as boolean : true
    this.preventDefaultException = options.preventDefaultException || { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
    this.HWCompositing = isBoolean(options.HWCompositing) ? options.HWCompositing as boolean : true
    this.useTransition = isBoolean(options.useTransition) ? options.useTransition as boolean : true
    this.useTransform = isBoolean(options.useTransform) ? options.useTransform as boolean : true
    this.bindToWrapper = isBoolean(options.bindToWrapper) ? options.bindToWrapper as boolean : this.isSupportMouseEvent()
    this.scrollingElement = (this.scrollWrapElement as HTMLElement).firstChild
   this.axis = {x:0,y:0,directionX:0,directionY:0} 
    this.enable = false;
    this.wrapOffset={};
    this.scrollOffset = {}
    this.notify = new Notifier();
    this.initializer();
    this.setRollState(true);
  }

  private setRollState(state: boolean): void {
    this.enable = state
  }

  private isNumber(v: any): boolean {
    return typeof v === 'number'
  }

  private isBoolean(v: any): boolean {
    return typeof v === 'boolean'
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
    return this.isSupport(this.prefixStyle('transform'), this.pseudo().style) && this.useTransform
  }

  private isSuportTransition(): boolean {
    return this.isSupport(this.prefixStyle('transition'), this.pseudo().style) && this.useTransition
  }

  private isSupportTouch(): boolean {
    return this.isSupport('ontouchstart', window);
  }

  private prefix(): iRoll.Prefix {
    return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }
  }


  private engine(): string {
    const u = navigator.userAgent
    if (u.indexOf('Trident') > -1) {
      return 'trident'
    } else if (u.indexOf('Presto') > -1) {
      return 'presto'
    } else if (u.indexOf('AppleWebKit') > -1) {
      return 'webKit'
    } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
      return 'gecko'
    } else {
      return ''
    }
  }

  private prefixStyle(style: string): string {
    let key: string = this.engine();
    if (key === '') {
      return style
    } else {
      const prefix = this.prefix();
      return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1)
    }
  }

  private pseudo(): HTMLDivElement {
    return document.createElement('div')
  }

  private anonymous(): iRoll.Category {
    return { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2, pointerdown: 3, pointermove: 3, pointerup: 3, MSPointerDown: 3, MSPointerMove: 3, MSPointerUp: 3 }
  }

  private isPreventDefault() {
    return this.eventPassthrough !== 1 && this.preventDefault;
  }

  private isLockScrollY() {
    return this.eventPassthrough === 1 ? false : this.scrollY
  }
  private isLockScrollX() {
    return this.eventPassthrough === 0 ? false : this.scrollX
  }

  private isLockFreeScroll() {
    return this.eventPassthrough === -1 && this.freeScroll
  }
  private on(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.addEventListener(type, fn, capture);
  }

  private off(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.removeEventListener(type, fn, capture)
  }

  private bootstrap(): string {
    return this.HWCompositing && this.isSuportPerspective() ? ' translateZ(0)' : ''
  }


  private handleStart(e: Event) {

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
    this.scrollTo(this.startX,this.startY)
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
    const target = this.bindToWrapper ? this.scrollWrapElement : window
    listener(window, 'orientationchange', this)
    listener(window, 'resize', this)

    if (this.clickable) {
      listener(this.scrollWrapElement, 'click', this, true)
    }
    /**
     * mouse
     *  */
    if (false) {
      listener(this.scrollWrapElement, 'mousedown', this)
      listener(target, 'mousemove', this)
      listener(target, 'mousecancel', this)
      listener(target, 'mouseup', this)
    }
    /**
     *  touch
     * */
    if (true) {
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
    this.wrapOffset.width = (this.scrollWrapElement as HTMLElement).clientWidth
    this.wrapOffset.height = (this.scrollWrapElement as HTMLElement).clientHeight
    this.scrollOffset.width = this.scrollingElement.
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param time 
   * @param ease 
   */
  public scrollTo(x:number,y:number,time?:number,ease?:iRoll.Anmation) {
    
  }

}