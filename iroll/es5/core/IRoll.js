import { isString, isNumber, isBoolean, isUndefined } from "@niyang-es/toolkit";
import RollProxy from "../translate/RollProxy";
import Scope from "../scope/Scope";
import Context from "./Context";
import Notify from "src/notify/Notify";
import Factory from "src/translate/Factory";
import { ToolKit } from "src/shared";
export default class IRoll {
    constructor(wrapper, options) {
        this.preventDefault = true;
        this.preventDefaultException = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };
        this.bindToWrapper = typeof window.onmousedown === 'undefined';
        this.resizePolling = 60;
        this.resizeTimeoutId = 0;
        this.stopPropagation = false;
        this.mouseWheel = false;
        this.notify = new Notify();
        this.scope = new Scope(isString(wrapper) ? document.body.querySelector(wrapper) : wrapper);
        this.rollProxy = new RollProxy(this.notify);
        this.context = new Context(this.rollProxy);
        this.factory = new Factory(this.notify);
        this.merge(options);
        this.initializer();
    }
    merge(options) {
        if (isBoolean(options.useTransition)) {
            this.factory.setUseTransition(options.useTransition);
        }
        if (isBoolean(options.useTransform)) {
            this.factory.setUseTransform(options.useTransform);
        }
        if (isBoolean(options.HWCompositing)) {
            this.factory.setHWCompositing(options.HWCompositing);
        }
        if (isBoolean(options.tap)) {
            this.scope.setTapabke(options.tap);
        }
        if (isBoolean(options.clickable)) {
            this.scope.setClickable(options.clickable);
        }
        if (isBoolean(options.bounce)) {
            this.scope.setBounce(options.bounce);
        }
        if (isNumber(options.bounceTime)) {
            this.scope.setBounceTime(options.bounceTime);
        }
        if (options.preventDefault) {
            this.preventDefault = options.preventDefault;
        }
        if (isBoolean(options.bindToWrapper)) {
            this.bindToWrapper = options.bindToWrapper;
        }
        if (options.preventDefaultException) {
            this.preventDefaultException = options.preventDefaultException;
        }
        if (isNumber(options.resizePolling)) {
            this.resizePolling = options.resizePolling;
        }
        if (isNumber(options.probe)) {
            this.scope.setProbe(options.probe);
        }
        if (isNumber(options.eventPassthrough)) {
            this.scope.setScrollMode(options.eventPassthrough);
        }
        if (isNumber(options.directionLockThreshold)) {
            this.scope.setDirectionLockThreshold(options.directionLockThreshold);
        }
        if (isNumber(options.specifiedIndex)) {
            this.scope.setContentSpecifiedIndex(options.specifiedIndex);
        }
        if (isBoolean(options.momentum)) {
            this.scope.setMomentum(options.momentum);
        }
        if (isNumber(options.momentumLimitDistance)) {
            this.scope.setMomentumThreshold(options.momentumLimitDistance);
        }
        if (isNumber(options.momentumLimitTime)) {
            this.scope.setMomentumPeroid(options.momentumLimitTime);
        }
        if (isNumber(options.deceleration)) {
            this.scope.setDeceleration(options.deceleration);
        }
        if (options.mouseWheel) {
            this.mouseWheel = options.mouseWheel;
        }
        if (isNumber(options.mouseWheelSpeed)) {
            this.scope.setMouseWheelSpeed(options.mouseWheelSpeed);
        }
        this.scope.setScrollX(options.scrollX ? 1 : 0);
        this.scope.setScrollY(isUndefined(options.scrollY) || options.scrollY ? 1 : 0);
        this.scope.setScrollZ(options.freeScroll && this.scope.isNoPrevent() ? 1 : 0);
        this.scope.setMouseWheelDirection(isUndefined(options.invertWheelDirection) || (!options.invertWheelDirection) ? 1 : -1);
        if (this.scope.isYPrevent()) {
            this.scope.setScrollY(0);
            this.scope.setDirectionLockThreshold(0);
            this.preventDefault = false;
        }
        if (this.scope.isXPrevent()) {
            this.scope.setScrollX(0);
            this.scope.setDirectionLockThreshold(0);
            this.preventDefault = false;
        }
        this.context.setStart(options.startX || 0, options.startY || 0);
    }
    isSupport(e, context) {
        return e in context;
    }
    isSupportTouch() {
        return this.isSupport('ontouchstart', window);
    }
    isWheelEnabled() {
        return this.mouseWheel;
    }
    addEventListener(el, type, fn, capture) {
        el.addEventListener(type, fn, capture);
    }
    removeEventListener(el, type, fn, capture) {
        el.removeEventListener(type, fn, capture);
    }
    preventDefaultFilter(el, exceptions) {
        for (let key in exceptions) {
            if (exceptions[key].test(el[key])) {
                return true;
            }
        }
        return false;
    }
    beforeStart(e) {
        if (this.preventDefault && !ToolKit.isBadAndroid() && !this.preventDefaultFilter(e.target, this.preventDefaultException)) {
            e.preventDefault();
        }
        if (this.stopPropagation) {
            e.stopPropagation();
        }
    }
    beforeStop(e) {
        if (this.preventDefault && !this.preventDefaultFilter(e.target, this.preventDefaultException)) {
            e.preventDefault();
        }
    }
    beforeMove(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
    }
    handleStart(e) {
        this.beforeStart(e);
        this.context.execute(e, 'start');
    }
    handleStop(e) {
        this.beforeStop(e);
        this.context.execute(e, 'stop');
    }
    resize(e) {
        const that = this;
        clearTimeout(this.resizeTimeoutId);
        this.resizeTimeoutId = setTimeout(function () {
            that.context.execute(e, 'refresh');
        }, this.resizePolling);
    }
    handleTransitionEnd(e) {
        this.context.execute(e, 'finish');
    }
    wheel(e) {
        this.context.execute(e, 'wheel');
    }
    handleMove(e) {
        this.beforeMove(e);
        this.context.execute(e, 'move');
    }
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    handleEvent(e) {
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
    addEvents() {
        this.initEvents(this.addEventListener);
    }
    /**
     * removeDOMEvents
     */
    removeEvents() {
        this.initEvents(this.removeEventListener);
    }
    /**
     * makeDOMEvents
     */
    initEvents(listener) {
        const rootElement = this.scope.getWrapElement();
        const target = this.bindToWrapper ? rootElement : window;
        listener(window, 'orientationchange', this);
        listener(window, 'resize', this);
        if (this.scope.isClickable()) {
            listener(rootElement, 'click', this, true);
        }
        /**
         * mouse
         *  */
        if (!this.isSupportTouch()) {
            listener(rootElement, 'mousedown', this);
            listener(target, 'mousemove', this);
            listener(target, 'mousecancel', this);
            listener(target, 'mouseup', this);
        }
        /**
         *  touch
         * */
        if (this.isSupportTouch()) {
            listener(rootElement, 'touchstart', this);
            listener(target, 'touchmove', this);
            listener(target, 'touchcancel', this);
            listener(target, 'touchend', this);
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
    initRoll() {
        this.rollProxy.build(this.factory.build(this.scope));
    }
    /**
     * initializer
     */
    initializer() {
        this.addEvents();
        this.initRoll();
        this.scrollTo(this.context.getStartX(), this.context.getStartY(), 0, this.rollProxy.getAnimation());
    }
    /**
     *
     * @param x
     * @param y
     * @param time
     * @param ease
     */
    scrollTo(x, y, time, ease) {
        this.rollProxy.scrollTo(x, y, time, ease);
    }
}
