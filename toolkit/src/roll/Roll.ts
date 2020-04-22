import isString from "src/is/isString"

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
  private scrollingElement: Element |null
  
  private scrollWrapElement:HTMLElement|null
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
    this.startX = (options.startX || 0)
    this.startY = (options.startX || 0)
    this.scrollX = options.scrollX || false
    this.scrollY = options.scrollY || true
    this.freeScroll = options.freeScroll || false
    this.eventPassthrough = options.eventPassthrough || -1
    this.clickable = options.clickable || false
    this.tap = options.tap || false
    this.bounce = options.bounce || true
    this.momentum = options.momentum || true
    this.probe = (options.probe || 0)
    this.preventDefault = options.preventDefault || true
    this.preventDefaultException = options.preventDefaultException || { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }
    this.HWCompositing = options.HWCompositing || true
    this.useTransition = options.useTransition || true
    this.useTransform = options.useTransition || true
    this.bindToWrapper = options.bindToWrapper || false
    this.scrollingElement = (this.scrollWrapElement as HTMLElement).children.item(0)
  }


  private isSupport(e: string, context: any): boolean {
    return e in context
  }

  private setPoint(x: number, y: number): iRoll.Point {
    return { x: x, y: y }
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

  private on(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture: boolean) {
    el.addEventListener(type, fn, capture);
  }

  private off(el:HTMLElement,type:string,fn:EventListenerOrEventListenerObject,capture:boolean){
    el.removeEventListener(type,fn,capture)
  }


  /**
   * initializer
   */
  public initializer() {
    this.addDOMEvents() 
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
  public makeDOMEvents(listener:Function) {
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

    listener(this.scrollingElement, transitionEnd, this)
  }

}