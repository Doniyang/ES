import { DomKit } from "../shared";
import Scope from "./Scope";
import Context from "./Context";
import Platform from "../platform/Platform";
export class IRoll {
    constructor(el, options) {
        this.scope = new Scope(DomKit.getElement(el));
        this.context = new Context(this.scope);
        this.platform = new Platform(this.scope);
        this.initializer(options);
    }
    initializer(options) {
        this.scope.merge(options);
        this.attach();
        const pos = this.scope.getZeta();
        this.scrollTo(pos.x, pos.y, 0);
    }
    isSupportTouch() {
        return 'ontouchstart' in window;
    }
    addEventListener(el, type, fn, capture) {
        el.addEventListener(type, fn, capture);
    }
    removeEventListener(el, type, fn, capture) {
        el.removeEventListener(type, fn, capture);
    }
    attach() {
        this.at(this.addEventListener, true);
    }
    detach() {
        this.at(this.removeEventListener, false);
    }
    at(listener, passive) {
        const rootElement = this.scope.getRootElement();
        const target = this.scope.isFocusOnWrap() ? rootElement : window;
        let captureOptions = { capture: false };
        listener(window, 'orientationchange', this);
        listener(window, 'resize', this);
        if (this.scope.isSupportClick()) {
            listener(rootElement, 'click', this.dispatch.bind(this), true);
        }
        if (!this.isSupportTouch()) {
            listener(rootElement, 'mousedown', this.dispatch.bind(this));
            listener(target, 'mousemove', this.dispatch.bind(this));
            listener(target, 'mousecancel', this.dispatch.bind(this));
            listener(target, 'mouseup', this.dispatch.bind(this));
        }
        if (this.isSupportTouch()) {
            if (passive) {
                captureOptions.passive = false;
            }
            listener(rootElement, 'touchstart', this.dispatch.bind(this), captureOptions);
            listener(target, 'touchmove', this.dispatch.bind(this), captureOptions);
            listener(target, 'touchcancel', this.dispatch.bind(this), captureOptions);
            listener(target, 'touchend', this.dispatch.bind(this), captureOptions);
        }
        if (this.scope.isSupportWheel()) {
            listener(rootElement, 'wheel', this.dispatch.bind(this));
            listener(rootElement, 'mousewheel', this.dispatch.bind(this));
            listener(rootElement, 'DOMMouseScroll', this.dispatch.bind(this));
        }
        listener(this.scope.getRollElement(), 'transitionend', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'webkitTransitionEnd', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'oTransitionEnd', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'MSTransitionEnd', this.dispatch.bind(this));
    }
    dispatch(e) {
        switch (e.type) {
            case 'touchstart':
            case 'mousedown':
                this.handleStart(e);
                break;
            case 'touchmove':
            case 'mousemove':
                this.handleMoving(e);
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
                this.handleDone(e);
                break;
            case 'wheel':
            case 'DOMMouseScroll':
            case 'mousewheel':
                this.handleMouseWheel(e);
                break;
            case 'click':
                this.handleClick(e);
                break;
            default:
                break;
        }
    }
    handleStart(e) {
        this.context.execute(e, 'start', this.platform);
    }
    handleMoving(e) {
        this.context.execute(e, 'move', this.platform);
    }
    handleStop(e) {
        this.context.execute(e, 'stop', this.platform);
    }
    resize(e) {
        this.context.execute(e, 'resize', this.platform);
    }
    handleMouseWheel(e) {
        this.context.execute(e, 'rolling', this.platform);
    }
    handleDone(e) {
        this.context.execute(e, 'done', this.platform);
    }
    handleClick(e) {
        e.stopPropagation();
        e.preventDefault();
    }
    on(name, fn) {
        this.platform.on(name, fn);
    }
    off(name, fn) {
        this.platform.off(name, fn);
    }
    scrollToElement(el, time, offsetX, offsetY, easing) {
        if (!el) {
            return void 0;
        }
        const rootElement = this.scope.getRootElement();
        const node = DomKit.getElement(el);
        let pos = DomKit.offset(node);
        const wrap = DomKit.offset(rootElement);
        let newX = pos.x - wrap.x;
        let newY = pos.y - wrap.y;
        if (offsetX === true) {
            offsetX = Math.round(node.offsetWidth / 2 - rootElement.offsetWidth / 2);
        }
        if (offsetY === true) {
            offsetY = Math.round(node.offsetHeight / 2 - rootElement.offsetHeight / 2);
        }
        newX -= offsetX || 0;
        newY -= offsetY || 0;
        newX = Math.max(this.scope.getMaxScrollX(), Math.min(0, newX));
        newY = Math.max(this.scope.getMaxScrollY(), Math.min(0, newY));
        this.scrollTo(newX, newY, time, easing);
    }
    scrollTo(x, y, time, ease) {
        this.platform.scrollTo(x, y, time, ease);
    }
    translate(x, y) {
        this.platform.translate(x, y);
    }
    destory() {
        this.platform.destory();
        this.detach();
    }
}
