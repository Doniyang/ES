import isString from "../is/isString";
import isNumber from "../is/isNumber";
import isBoolean from "../is/isBoolean";
import Notifier from "src/notify/Notifier";
export default class Roll {
    constructor(wrapper, options) {
        this.scrollWrapElement = isString(wrapper) ? document.querySelector(wrapper) : wrapper;
        this.directionLockThreshold = 5;
        this.bounceTime = 700;
        this.momentumLimitTime = 300;
        this.momentumLimitDistance = 15;
        this.swipeTime = 2500;
        this.swipeBounceTime = 500;
        this.deceleration = 0.001;
        this.flickLimitTime = 200;
        this.flickLimitDistance = 100;
        this.resizePolling = 60;
        this.startX = isNumber(options.startX) ? options.startX : 0;
        this.startY = isNumber(options.startY) ? options.startY : 0;
        this.scrollX = isBoolean(options.scrollX) ? options.scrollX : false;
        this.scrollY = isBoolean(options.scrollY) ? options.scrollY : true;
        this.freeScroll = isBoolean(options.freeScroll) ? options.freeScroll : false;
        this.eventPassthrough = isNumber(options.eventPassthrough) ? options.eventPassthrough : -1;
        this.clickable = isBoolean(options.clickable) ? options.clickable : false;
        this.tap = isBoolean(options.tap) ? options.tap : false;
        this.bounce = isBoolean(options.bounce) ? options.bounce : true;
        this.momentum = isBoolean(options.momentum) ? options.momentum : true;
        this.probe = isNumber(options.probe) ? options.probe : 0;
        this.preventDefault = isBoolean(options.preventDefault) ? options.preventDefault : true;
        this.preventDefaultException = options.preventDefaultException || { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ };
        this.HWCompositing = isBoolean(options.HWCompositing) ? options.HWCompositing : true;
        this.useTransition = isBoolean(options.useTransition) ? options.useTransition : true;
        this.useTransform = isBoolean(options.useTransform) ? options.useTransform : true;
        this.bindToWrapper = isBoolean(options.bindToWrapper) ? options.bindToWrapper : this.isSupportMouseEvent();
        this.scrollingElement = this.scrollWrapElement.firstChild;
        this.axis = { x: 0, y: 0, directionX: 0, directionY: 0 };
        this.enable = false;
        this.wrapOffset = {};
        this.scrollOffset = {};
        this.notify = new Notifier();
        this.initializer();
        this.setRollState(true);
    }
    setRollState(state) {
        this.enable = state;
    }
    isNumber(v) {
        return typeof v === 'number';
    }
    isBoolean(v) {
        return typeof v === 'boolean';
    }
    isSupport(e, context) {
        return e in context;
    }
    isSupportMouseEvent() {
        return this.isSupport('onmousedown', window);
    }
    isSupportPointer() {
        return this.isSupport('PointerEvent', window) || this.isSupport('MSPointerEvent', window);
    }
    isSuportPerspective() {
        return this.isSupport(this.prefixStyle('perspective'), this.pseudo().style);
    }
    isSuportTransform() {
        return this.isSupport(this.prefixStyle('transform'), this.pseudo().style) && this.useTransform;
    }
    isSuportTransition() {
        return this.isSupport(this.prefixStyle('transition'), this.pseudo().style) && this.useTransition;
    }
    isSupportTouch() {
        return this.isSupport('ontouchstart', window);
    }
    prefix() {
        return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' };
    }
    engine() {
        const u = navigator.userAgent;
        if (u.indexOf('Trident') > -1) {
            return 'trident';
        }
        else if (u.indexOf('Presto') > -1) {
            return 'presto';
        }
        else if (u.indexOf('AppleWebKit') > -1) {
            return 'webKit';
        }
        else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
            return 'gecko';
        }
        else {
            return '';
        }
    }
    prefixStyle(style) {
        let key = this.engine();
        if (key === '') {
            return style;
        }
        else {
            const prefix = this.prefix();
            return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1);
        }
    }
    pseudo() {
        return document.createElement('div');
    }
    anonymous() {
        return { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2, pointerdown: 3, pointermove: 3, pointerup: 3, MSPointerDown: 3, MSPointerMove: 3, MSPointerUp: 3 };
    }
    isPreventDefault() {
        return this.eventPassthrough !== 1 && this.preventDefault;
    }
    isLockScrollY() {
        return this.eventPassthrough === 1 ? false : this.scrollY;
    }
    isLockScrollX() {
        return this.eventPassthrough === 0 ? false : this.scrollX;
    }
    isLockFreeScroll() {
        return this.eventPassthrough === -1 && this.freeScroll;
    }
    on(el, type, fn, capture) {
        el.addEventListener(type, fn, capture);
    }
    off(el, type, fn, capture) {
        el.removeEventListener(type, fn, capture);
    }
    bootstrap() {
        return this.HWCompositing && this.isSuportPerspective() ? ' translateZ(0)' : '';
    }
    handleStart(e) {
    }
    handleStop(e) {
    }
    resize(e) {
    }
    handleTransitionEnd(e) {
    }
    wheel(e) {
    }
    handleMove(e) { }
    handleKey(e) {
    }
    handleEvent(e) {
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
    initializer() {
        this.addDOMEvents();
        this.refresh();
        this.scrollTo(this.startX, this.startY);
    }
    /**
     * addDOMEvents
     */
    addDOMEvents() {
        this.makeDOMEvents(this.on);
    }
    /**
     * removeDOMEvents
     */
    removeDOMEvents() {
        this.makeDOMEvents(this.off);
    }
    /**
     * makeDOMEvents
     */
    makeDOMEvents(listener) {
        const target = this.bindToWrapper ? this.scrollWrapElement : window;
        listener(window, 'orientationchange', this);
        listener(window, 'resize', this);
        if (this.clickable) {
            listener(this.scrollWrapElement, 'click', this, true);
        }
        /**
         * mouse
         *  */
        if (false) {
            listener(this.scrollWrapElement, 'mousedown', this);
            listener(target, 'mousemove', this);
            listener(target, 'mousecancel', this);
            listener(target, 'mouseup', this);
        }
        /**
         *  touch
         * */
        if (true) {
            listener(this.scrollWrapElement, 'touchstart', this);
            listener(target, 'touchmove', this);
            listener(target, 'touchcancel', this);
            listener(target, 'touchend', this);
        }
        listener(this.scrollingElement, 'transitionEnd', this);
    }
    /**
     * refresh
     */
    refresh() {
        this.wrapOffset.width = this.scrollWrapElement.clientWidth;
        this.wrapOffset.height = this.scrollWrapElement.clientHeight;
    }
    /**
     *
     * @param x
     * @param y
     * @param time
     * @param ease
     */
    scrollTo(x, y, time, ease) {
    }
}
