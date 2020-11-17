import Axis from "../axis/Axis";
export default class Scope {
    constructor(el) {
        this.rootElement = el;
        this.axis = new Axis();
        this.scroll = new Axis();
        this.passthrough = 0;
        this.threshold = 0;
        this.time = 600;
        this.bounce = true;
        this.momentum = true;
        this.clickable = false;
        this.tap = false;
        this.deceleration = 0.0006;
        this.HWCompositing = true;
    }
    getScrollOffsetWidth() {
        return this.getScrollElement().offsetWidth;
    }
    getScrollOffsetHeight() {
        return this.getScrollElement().offsetHeight;
    }
    compare(a, b) {
        return a < b;
    }
    setPassthrough(sign) {
        this.passthrough = sign;
    }
    setThreshold(hold) {
        this.threshold = hold;
    }
    setScrollX(x) {
        this.scroll.setAxisX(x);
    }
    setScrollY(y) {
        this.scroll.setAxisY(y);
    }
    setScrollZ(z) {
        this.scroll.setAxisZ(z);
    }
    setBounce(bounce) {
        this.bounce = bounce;
    }
    setMomentum(momentum) {
        this.momentum = momentum;
    }
    setDeceleration(deceleration) {
        this.deceleration = deceleration;
    }
    setBounceTime(time) {
        this.time = time;
    }
    setClickable(clickable) {
        this.clickable = clickable;
    }
    setTap(tap) {
        this.tap = tap;
    }
    setHWCompositing(isComposition) {
        this.HWCompositing = isComposition;
    }
    position() {
        return { x: this.axis.getAxisX(), y: this.axis.getAxisY() };
    }
    setAxis(x, y) {
        this.axis.setAxisX(x);
        this.axis.setAxisY(y);
    }
    isAxisXPassthrough() {
        return this.passthrough === 1;
    }
    isAxisYPassthrough() {
        return this.passthrough === 2;
    }
    isAxisXScroll() {
        return this.scroll.getAxisX() === 1;
    }
    isAxisYScroll() {
        return this.scroll.getAxisY() === 1;
    }
    isAxisScroll() {
        return this.scroll.getAxisZ() === 1;
    }
    isLockAxisXScroll() {
        return this.isAxisXScroll() && this.compare(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    isLockAxisYScroll() {
        return this.isAxisYScroll() && this.compare(this.getClientHeight(), this.getScrollOffsetHeight());
    }
    isBounce() {
        return this.bounce;
    }
    isMomentum() {
        return this.momentum;
    }
    isClickable() {
        return this.clickable;
    }
    isTap() {
        return this.tap;
    }
    isHWCompositing() {
        return this.HWCompositing;
    }
    getDeceleration() {
        return this.deceleration;
    }
    getBounceTime() {
        return this.time;
    }
    getThreshold() {
        return this.threshold;
    }
    getWrapElement() {
        return this.rootElement;
    }
    getScrollElement() {
        return this.rootElement.children.item(0);
    }
    getClientWidth() {
        return this.rootElement.clientWidth;
    }
    getClientHeight() {
        return this.rootElement.clientHeight;
    }
    getScrollWidth() {
        if (!this.isLockAxisXScroll()) {
            return this.getClientWidth();
        }
        return this.getScrollOffsetWidth();
    }
    getScrollHeight() {
        if (!this.isLockAxisYScroll()) {
            return this.getClientHeight();
        }
        return this.getScrollOffsetHeight();
    }
    getMaxScrollWidth() {
        if (!this.isLockAxisXScroll()) {
            return 0;
        }
        return this.getClientWidth() - this.getScrollOffsetWidth();
    }
    getMaxScrollHeight() {
        if (!this.isLockAxisYScroll()) {
            return 0;
        }
        return this.getClientHeight() - this.getScrollOffsetHeight();
    }
}
