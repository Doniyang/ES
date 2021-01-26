import { isString, isNumber, isBoolean, PrefixStyle, Circular, isUndefined } from "@niyang-es/toolkit";
import Scope from "./scope/Scope";
import RollProxy from "./RollProxy";
import Context from "./Context";
import Notify from "./notify/Notify";
import RollStart from "./core/RollStart";
import RollStop from "./core/RollStop";
import RollRefresh from "./core/RollRefresh";
import RollFinish from "./core/RollFinish";
import RollMove from "./core/RollMove";
import TransitionTranslateRoll from "./transition/TransitionTranslateRoll";
import TransitionRoll from "./transition/TransitionRoll";
import AnimationTranslateRoll from "./animation/AnimationTranslateRoll";
import AnimationRoll from "./animation/AnimationRoll";
export default class IRoll {
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
    this.scope = new Scope(isString(wrapper) ? document.body.querySelector(wrapper as string) as HTMLElement : wrapper as HTMLElement);
    this.rollProxy = new RollProxy(this.notify);
    this.context = new Context(this.rollProxy);
    this.updateScrollOptions(options);
    this.initializer()
  }

  private updateScrollOptions(options: ScrollKit.scrollOptions) {
    if (isNumber(options.eventPassthrough)) {
      this.scope.setPassthrough(options.eventPassthrough as number)
    }
    if (isBoolean(options.clickable)) {
      this.scope.setClickable(options.clickable as boolean)
    }
    if (isBoolean(options.tap)) {
      this.scope.setTap(options.tap as boolean)
    }
    if (isBoolean(options.bounce)) {
      this.scope.setBounce(options.bounce as boolean)
    }
    if (isBoolean(options.momentum)) {
      this.scope.setMomentum(options.momentum as boolean)
    }

    if (isBoolean(options.HWCompositing)) {
      this.scope.setHWCompositing(options.HWCompositing as boolean)
    }

    if (isNumber(options.probe)) {
      this.scope.setProbe(<number>options.probe)
    }

    if (!isUndefined(options.wheel) && isNumber((options.wheel as ScrollKit.WheelParams).speed)) {
      this.scope.setWheelSpeed((options.wheel as ScrollKit.WheelParams).speed as number)
    }

    if (!isUndefined(options.wheel)) {
      this.scope.setWheelSpeed((options.wheel as ScrollKit.WheelParams).invert ? -1 : 1)
    }

    if (!isUndefined(options.wheel)) {
      this.scope.setEnableWheel((options.wheel as ScrollKit.WheelParams).enable as boolean)
    }

    if (isBoolean(options.preventDefault)) {
      this.preventDefault = options.preventDefault as boolean;
    }

    if (isBoolean(options.useTransition)) {
      this.useTransition = options.useTransition as boolean;
    }

    if (isBoolean(options.useTransform)) {
      this.useTransform = options.useTransform as boolean;
    }

    if (isBoolean(options.bindToWrapper)) {
      this.bindToWrapper = options.bindToWrapper as boolean;
    }

    this.scope.setScrollX(options.scrollX ? 1 : 0)
    this.scope.setScrollY(options.scrollY === false ? 0 : 1)
    this.scope.setScrollZ(options.freeScroll ? 1 : 0)
    this.context.setStart(options.startX || 0, options.startY || 0)
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

  private isWheelEnabled() {
    return this.scope.isWheelEnabled()
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
    this.context.setContext(RollStart);
    this.stopPreventDefault(e);
    this.context.execute(e)
  }

  private handleStop(e: Event) {
    this.context.setContext(RollStop)
    this.stopPreventDefault(e);
    this.context.execute(e)
  }

  private resize(e: Event) {
    this.context.setContext(RollRefresh);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }
  private handleTransitionEnd(e: Event) {
    this.context.setContext(RollFinish);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }

  private wheel(e: MouseEvent) {
    // this.context.setContext();
  }

  private handleMove(e: Event) {
    this.context.setContext(RollMove);
    this.stopPreventDefault(e);
    this.context.execute(e);
  }

  private handleClick(e: Event) {

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
        this.wheel(e as MouseEvent);
        break;
      case 'click':
        this.handleClick(e);
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

    if (this.isWheelEnabled()) {
      listener(rootElement, 'wheel', this);
      listener(rootElement, 'mousewheel', this);
      listener(rootElement, 'DOMMouseScroll', this);
    }


    listener(this.scope.getScrollElement(), 'transitionend', this);
    listener(this.scope.getScrollElement(), 'webkitTransitionEnd', this);
    listener(this.scope.getScrollElement(), 'oTransitionEnd', this);
    listener(this.scope.getScrollElement(), 'MSTransitionEnd', this);
  }
  private initRoll() {
    const circular = new Circular();
    if (this.isSuportTransition()) {
      if (this.isSuportTransform()) {
        this.rollProxy.build(new TransitionTranslateRoll(this.scope, circular.style()))
      } else {
        this.rollProxy.build(new TransitionRoll(this.scope, circular.style()))
      }
    } else {
      if (this.isSuportTransform()) {
        this.rollProxy.build(new AnimationTranslateRoll(this.scope, circular.algorithm, this.notify))
      } else {
        this.rollProxy.build(new AnimationRoll(this.scope, circular.algorithm, this.notify))
      }
    }
  }

  /**
   * initializer
   */
  private initializer() {
    this.addEvents();
    this.initRoll();
    this.scrollTo(this.context.getStartX(), this.context.getStartY(), 0)
  }

  /**
   * 
   * @param x 
   * @param y 
   * @param time 
   * @param ease 
   */
  public scrollTo(x: number, y: number, time: number) {
    this.rollProxy.scrollTo(x, y, time);
  }



}