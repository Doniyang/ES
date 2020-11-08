export default class RollProxy {
    constructor(notify) {
        this.roll = null;
        this.notify = notify;
    }
    get disabled() {
        return this.roll === null;
    }
    build(roll) {
        this.roll = roll;
    }
    trigger(e, ...args) {
        this.notify.trigger(e, args);
    }
    scrollTo(x, y, time) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.scrollTo(x, y, time);
    }
    translate(x, y) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.translate(x, y);
    }
    getSize() {
        return this.roll.getSize();
    }
    getDeceleration() {
        return this.roll.getDeceleration();
    }
    getState() {
        return this.roll.getState();
    }
    setState(state) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.setState(state);
    }
    setAnimation(easing) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.setAnimation(easing);
    }
    getComputedPosition() {
        return this.roll.getComputedPosition();
    }
    getMaxScroll() {
        return this.roll.getMaxScroll();
    }
    getPosition() {
        return this.roll.getPosition();
    }
    getDirectionLockThreshold() {
        return this.roll.getDirectionLockThreshold();
    }
    stop() {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.stop();
        this.trigger('scroll:end', this.getPosition());
    }
    resetPosition() {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.resetPosition();
    }
    isFreeScroll() {
        return this.roll.isFreeScroll();
    }
    isHScroll() {
        return this.roll.isHScroll();
    }
    isVScroll() {
        return this.roll.isVScroll();
    }
    isHPassthrough() {
        return this.roll.isHPassthrough();
    }
    isVPassthrough() {
        return this.roll.isVPassthrough();
    }
    isTransition() {
        return this.roll.isTransition();
    }
    isResilient() {
        return this.roll.isResilient();
    }
    isOnRush() {
        return this.roll.isOnRush();
    }
    isPeak() {
        return this.roll.isPeak();
    }
    isClickable() {
        return this.roll.isClickable();
    }
    isTapable() {
        return this.roll.isTapable();
    }
}
