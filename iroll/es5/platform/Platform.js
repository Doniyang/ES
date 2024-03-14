import { isNull } from "@niyang-es/toolkit";
import Transform from "../transform/Transform";
import Animation from "../animation/Animation";
import Transition from "../animation/Transition";
import Position from "../transform/Position";
import Notification from "../notification/Notification";
export default class Platform {
    constructor(scope) {
        this.scope = scope;
        this.transform = null;
        this.animation = null;
        this.notify = new Notification();
    }
    isSupportTransform() {
        return this.scope.isSupportTransform();
    }
    isSupportTransition() {
        return this.scope.isSupportTransition();
    }
    buildTransform() {
        this.transform = this.isSupportTransform() ? new Transform(this.scope) : new Position(this.scope);
    }
    buildAnimation() {
        if (isNull(this.transform))
            this.buildTransform();
        this.animation = this.isSupportTransition() ? new Transition(this.scope, this.transform, this.notify) : new Animation(this.scope, this.transform, this.notify);
    }
    isNoChange(x, y) {
        const pos = this.scope.getZeta();
        return x === pos.x && y === pos.y;
    }
    on(name, fn) {
        this.notify.on(name, fn);
    }
    off(name, fn) {
        this.notify.off(name, fn);
    }
    trigger(e, ...args) {
        this.notify.trigger(e, ...args);
    }
    translate(x, y) {
        var _a;
        if (isNull(this.transform))
            this.buildTransform();
        (_a = this.transform) === null || _a === void 0 ? void 0 : _a.translate(x, y);
    }
    scrollTo(x, y, time, ease) {
        var _a;
        if (this.isNoChange(x, y)) {
            this.scope.setState(0);
            return void 0;
        }
        if (isNull(this.animation))
            this.buildAnimation();
        (_a = this.animation) === null || _a === void 0 ? void 0 : _a.scrollTo(x, y, time, ease);
    }
    stop() {
        var _a;
        if (isNull(this.animation))
            this.buildAnimation();
        (_a = this.animation) === null || _a === void 0 ? void 0 : _a.stop();
    }
    reset() {
        var _a;
        if (isNull(this.animation))
            this.buildAnimation();
        (_a = this.animation) === null || _a === void 0 ? void 0 : _a.refresh();
    }
}
