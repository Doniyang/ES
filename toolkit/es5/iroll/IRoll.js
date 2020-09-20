import isString from "../is/isString";
import isNumber from "../is/isNumber";
import isBoolean from "../is/isBoolean";
import Scope from "./scope/Scope";
import RollProxy from "./RollProxy";
import Context from "./Context";
import Notify from "./notify/Notify";
import RollStart from "./core/RollStart";
import RollStop from "./core/RollStop";
import RollRefresh from "./core/RollRefresh";
import RollFinish from "./core/RollFinish";
import RollMove from "./core/RollMove";
import PrefixStyle from "../dom/PrefixStyle";
import TransitionTranslateRoll from "./transition/TransitionTranslateRoll";
import CircularFactory from "../anmiation/circular/CircularFactory";
import TransitionRoll from "./transition/TransitionRoll";
import AnimationTranslateRoll from "./animation/AnimationTranslateRoll";
import AnimationRoll from "./animation/AnimationRoll";
export default class DigitalScroll {
    constructor(wrapper, options) {
        this.directionLockThreshold = 5;
        this.bounceTime = 700;
        this.deceleration = 0.0015;
        this.preventDefault = true;
        this.useTransform = true;
        this.useTransition = true;
        this.bindToWrapper = typeof window.onmousedown === 'undefined';
        this.notify = new Notify();
        this.scope = new Scope(isString(wrapper) ? document.body.querySelector(wrapper) : wrapper);
        this.rollProxy = new RollProxy(this.notify);
        this.context = new Context(this.rollProxy);
        this.updateScrollOptions(options);
        this.initializer();
    }
    updateScrollOptions(options) {
        if (isNumber(options.eventPassthrough)) {
            this.scope.setPassthrough(options.eventPassthrough);
        }
        if (isBoolean(options.clickable)) {
            this.scope.setClickable(options.clickable);
        }
        if (isBoolean(options.tap)) {
            this.scope.setTap(options.tap);
        }
        if (isBoolean(options.bounce)) {
            this.scope.setBounce(options.bounce);
        }
        if (isBoolean(options.momentum)) {
            this.scope.setMomentum(options.momentum);
        }
        if (isBoolean(options.HWCompositing)) {
            this.scope.setHWCompositing(options.HWCompositing);
        }
        if (isBoolean(options.preventDefault)) {
            this.preventDefault = options.preventDefault;
        }
        if (isBoolean(options.useTransition)) {
            this.useTransition = options.useTransition;
        }
        if (isBoolean(options.useTransform)) {
            this.useTransform = options.useTransform;
        }
        if (isBoolean(options.bindToWrapper)) {
            this.bindToWrapper = options.bindToWrapper;
        }
        this.scope.setScrollX(options.scrollX ? 1 : 0);
        this.scope.setScrollY(options.scrollY ? 1 : 0);
        this.scope.setScrollZ(options.freeScroll ? 1 : 0);
        this.context.setStart(options.startX || 0, options.startY || 0);
    }
    isSupport(e, context) {
        return e in context;
    }
    isSuportTransform() {
        return PrefixStyle.has('transform') && this.useTransform;
    }
    isSuportTransition() {
        return PrefixStyle.has('transition') && this.useTransition;
    }
    isSupportTouch() {
        return this.isSupport('ontouchstart', window);
    }
    addEventListener(el, type, fn, capture) {
        el.addEventListener(type, fn, capture);
    }
    removeEventListener(el, type, fn, capture) {
        el.removeEventListener(type, fn, capture);
    }
    stopPreventDefault(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
    }
    handleStart(e) {
        this.context.setContext(RollStart);
        this.stopPreventDefault(e);
        this.context.execute(e);
    }
    handleStop(e) {
        this.context.setContext(RollStop);
        this.stopPreventDefault(e);
        this.context.execute(e);
    }
    resize(e) {
        this.context.setContext(RollRefresh);
        this.stopPreventDefault(e);
        this.context.execute(e);
    }
    handleTransitionEnd(e) {
        this.context.setContext(RollFinish);
        this.stopPreventDefault(e);
        this.context.execute(e);
    }
    wheel(e) {
    }
    handleMove(e) {
        this.context.setContext(RollMove);
        this.stopPreventDefault(e);
        this.context.execute(e);
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
        listener(this.scope.getScrollElement(), 'transitionend', this);
        listener(this.scope.getScrollElement(), 'webkitTransitionEnd', this);
        listener(this.scope.getScrollElement(), 'oTransitionEnd', this);
        listener(this.scope.getScrollElement(), 'MSTransitionEnd', this);
    }
    initRoll() {
        const circular = new CircularFactory();
        if (this.isSuportTransition()) {
            if (this.isSuportTransform()) {
                this.rollProxy.build(new TransitionTranslateRoll(this.scope, circular.style()));
            }
            else {
                this.rollProxy.build(new TransitionRoll(this.scope, circular.style()));
            }
        }
        else {
            if (this.isSuportTransform()) {
                this.rollProxy.build(new AnimationTranslateRoll(this.scope, circular.algorithm, this.notify));
            }
            else {
                this.rollProxy.build(new AnimationRoll(this.scope, circular.algorithm, this.notify));
            }
        }
    }
    /**
     * initializer
     */
    initializer() {
        this.addEvents();
        this.initRoll();
        this.scrollTo(this.context.getStartX(), this.context.getStartY(), 0);
    }
    /**
     *
     * @param x
     * @param y
     * @param time
     * @param ease
     */
    scrollTo(x, y, time) {
        this.rollProxy.scrollTo(x, y, time);
    }
}
