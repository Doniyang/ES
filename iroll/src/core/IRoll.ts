import {isString, isNumber, isBoolean, isUndefined} from "@niyang-es/toolkit";
import RollProxy from "../translate/RollProxy";
import Scope from "../scope/Scope";
import Context from "./Context";
import Notify from "../notify/Notify";
import Factory from "../translate/Factory";
import {ToolKit} from "../shared";


export default class IRoll {
    private scope: Scope;
    private rollProxy: RollProxy;
    private context: Context;
    private notify: Notify;
    private factory: Factory;
    private bindToWrapper: boolean
    private preventDefault: boolean
    private preventDefaultException: ScrollKit.Exception
    private resizePolling: number
    private stopPropagation: boolean
    private mouseWheel: boolean
    private resizeTimeoutId: number

    constructor(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.Options) {
        this.preventDefault = true
        this.preventDefaultException = {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/}
        this.bindToWrapper = typeof window.onmousedown === 'undefined';
        this.resizePolling = 60
        this.resizeTimeoutId = 0;
        this.stopPropagation = false
        this.mouseWheel = false
        this.notify = new Notify()
        this.scope = new Scope(isString(wrapper) ? document.body.querySelector(wrapper as string) as HTMLElement : wrapper as HTMLElement);
        this.rollProxy = new RollProxy(this.notify);
        this.context = new Context(this.rollProxy);
        this.factory = new Factory(this.notify);
        this.merge(options);
        this.initializer()
    }

    private merge(options: ScrollKit.Options) {
        if (isBoolean(options.useTransition)) {
            this.factory.setUseTransition(options.useTransition)
        }
        if (isBoolean(options.useTransform)) {
            this.factory.setUseTransform(options.useTransform)
        }
        if (isBoolean(options.HWCompositing)) {
            this.factory.setHWCompositing(options.HWCompositing)
        }

        if (isBoolean(options.tap)) {
            this.scope.setTapable(options.tap)
        }

        if (isBoolean(options.clickable)) {
            this.scope.setClickable(options.clickable)
        }

        if (isBoolean(options.bounce)) {
            this.scope.setBounce(options.bounce)
        }

        if (isNumber(options.bounceTime)) {
            this.scope.setBounceTime(options.bounceTime)
        }

        if (options.preventDefault) {
            this.preventDefault = options.preventDefault
        }

        if (isBoolean(options.bindToWrapper)) {
            this.bindToWrapper = options.bindToWrapper
        }

        if (options.preventDefaultException) {
            this.preventDefaultException = options.preventDefaultException
        }

        if (isNumber(options.resizePolling)) {
            this.resizePolling = options.resizePolling
        }

        if (isNumber(options.probe)) {
            this.scope.setProbe(options.probe)
        }

        if (isNumber(options.eventPassthrough)) {
            this.scope.setScrollPreventState(options.eventPassthrough)
        }

        if (isNumber(options.directionLockThreshold)) {
            this.scope.setDirectionLockThreshold(options.directionLockThreshold)
        }

        if (isNumber(options.specifiedIndex)) {
            this.scope.setContentSpecifiedIndex(options.specifiedIndex)
        }

        if (isBoolean(options.momentum)) {
            this.scope.setMomentum(options.momentum)
        }

        if (isNumber(options.momentumLimitDistance)) {
            this.scope.setMomentumThreshold(options.momentumLimitDistance)
        }
        if (isNumber(options.momentumLimitTime)) {
            this.scope.setMomentumPeroid(options.momentumLimitTime)
        }

        if (isNumber(options.deceleration)) {
            this.scope.setDeceleration(options.deceleration)
        }

        if (options.mouseWheel) {
            this.mouseWheel = options.mouseWheel
        }

        if (isNumber(options.mouseWheelSpeed)) {
            this.scope.setMouseWheelSpeed(options.mouseWheelSpeed as number)
        }

        this.scope.setScrollX(options.scrollX ? 1 : 0)
        this.scope.setScrollY(isUndefined(options.scrollY) || options.scrollY ? 1 : 0)
        this.scope.setScrollZ(options.freeScroll && this.scope.isNoPrevent() ? 1 : 0)
        this.scope.setMouseWheelDirection(isUndefined(options.invertWheelDirection) || (!options.invertWheelDirection) ? 1 : -1)

        if (this.scope.isYPrevent()) {
            this.scope.setScrollY(0)
            this.scope.setDirectionLockThreshold(0)
            this.preventDefault = false
        }

        if (this.scope.isXPrevent()) {
            this.scope.setScrollX(0)
            this.scope.setDirectionLockThreshold(0)
            this.preventDefault = false
        }

        this.context.setStart(options.startX || 0, options.startY || 0)

    }

    private isSupport(e: string, context: any): boolean {
        return e in context
    }

    private isSupportTouch(): boolean {
        return this.isSupport('ontouchstart', window);
    }

    private isWheelEnabled() {
        return this.mouseWheel
    }

    private addEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture?: boolean|AddEventListenerOptions) {
        el.addEventListener(type, fn, capture);
    }

    private removeEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture?: boolean | EventListenerOptions) {
        el.removeEventListener(type, fn, capture)
    }

    private preventDefaultFilter(el: any, exceptions: ScrollKit.Exception): boolean {
        for (let key in exceptions) {
            if (exceptions[key].test(el[key])) {
                return true
            }
        }
        return false
    }

    private beforeStart(e: Event) {
        if (this.preventDefault && !ToolKit.isBadAndroid() && !this.preventDefaultFilter(e.target, this.preventDefaultException)) {
            e.preventDefault()
        }
        if (this.stopPropagation) {
            e.stopPropagation()
        }
    }

    private beforeStop(e: Event) {
        if (this.preventDefault && !this.preventDefaultFilter(e.target, this.preventDefaultException)) {
            e.preventDefault()
        }
    }

    private beforeMove(e: Event) {
        if (this.preventDefault) {
            e.preventDefault()
        }
    }


    private handleStart(e: Event) {
        this.beforeStart(e);
        this.context.execute(e, 'start')
    }

    private handleStop(e: Event) {
        this.beforeStop(e)
        this.context.execute(e, 'stop')
    }

    private resize(e: Event) {
        const that = this
        clearTimeout(this.resizeTimeoutId)

        this.resizeTimeoutId = setTimeout(function () {
            that.context.execute(e, 'refresh');
        }, this.resizePolling);

    }

    private handleTransitionEnd(e: Event) {
        this.context.execute(e, 'finish');
    }

    private wheel(e: Event) {
        this.context.execute(e, 'wheel');
    }

    private handleMove(e: Event) {
        this.beforeMove(e);
        this.context.execute(e, 'move');
    }

    private handleClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();
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
        this.makeEvents(this.addEventListener,true)
    }

    /**
     * removeDOMEvents
     */
    private removeEvents() {
        this.makeEvents(this.removeEventListener,false)
    }

    /**
     * makeDOMEvents
     */
    private makeEvents(listener: ScrollKit.EventListener,enroll:boolean) {
        const rootElement: HTMLElement = this.scope.getWrapElement();
        const target: HTMLElement | Window = this.bindToWrapper ? rootElement : window;
        let captureOptions:AddEventListenerOptions = {capture:false}
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
            if(enroll){captureOptions.passive = false}
            listener(rootElement, 'touchstart', this,captureOptions)
            listener(target, 'touchmove', this,captureOptions)
            listener(target, 'touchcancel', this,captureOptions)
            listener(target, 'touchend', this,captureOptions)
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
        this.rollProxy.build(this.factory.build(this.scope))
    }

    /**
     * initializer
     */
    private initializer() {
        this.addEvents();
        this.initRoll()
        this.scrollTo(this.context.getStartX(), this.context.getStartY(), 0, this.rollProxy.getAnimation())
    }

    /**
     *
     * @param x
     * @param y
     * @param time
     * @param ease
     */
    public scrollTo(x: number, y: number, time: number, ease: string | ScrollKit.Algorithm) {
        this.rollProxy.scrollTo(x, y, time, ease);
    }

    /**
     * destory
     */
    public destory() {
        this.removeEvents();
        this.context.destroy();
    } 

}
