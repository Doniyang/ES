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
    scrollTo(x, y, time, easing) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.scrollTo(x, y, time, easing);
    }
    translate(x, y) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.translate(x, y);
    }
    getState() {
        return this.roll.getState();
    }
    setState(state) {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.setState(state);
    }
    getComputedPosition() {
        return this.roll.getComputedPosition();
    }
    getPosition() {
        return this.roll.getPosition();
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
    getAnimation() {
        return this.roll.getAnimation();
    }
    getScope() {
        return this.roll.getScope();
    }
}
