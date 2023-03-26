import Factory from "./Factory";
export default class RollProxy {
    constructor(notify) {
        this.roll = null;
        this.notify = notify;
        this.factory = new Factory();
    }
    get disabled() {
        return this.roll === null;
    }
    trigger(name, ...args) {
        this.notify.trigger(name, ...args);
    }
    setUseTransition(useTransition) {
        this.factory.setUseTransition(useTransition);
    }
    setUseTransform(useTransform) {
        this.factory.setUseTransform(useTransform);
    }
    setHWCompositing(HWCompositing) {
        this.factory.setHWCompositing(HWCompositing);
    }
    build(scope) {
        this.roll = this.factory.build(scope, this.notify);
    }
    getScope() {
        return this.roll.getScope();
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
    getPosition() {
        return this.roll.getPosition();
    }
    getComputedPosition() {
        return this.roll.getComputedPosition();
    }
    getAnimation() {
        return this.roll.getAnimation();
    }
    stop() {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.stop();
    }
    resetPosition() {
        var _a;
        (_a = this.roll) === null || _a === void 0 ? void 0 : _a.resetPosition();
    }
}
