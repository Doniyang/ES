import { isString, Quadratic } from "@niyang-es/toolkit";
import { DateKit, EventKit } from "../shared";
export default class RollStop {
    constructor() {
        this.delay = 300;
    }
    isOutBoundary(prev, next) {
        return !(prev.x === next.x && prev.y === next.y);
    }
    isFastMoving(duration) {
        return duration < this.delay;
    }
    equal(a, b) {
        return a === b;
    }
    isLarger(a, b) {
        return a > b;
    }
    attain(state) {
        return state === 2 || state === 1;
    }
    execute(e, attrs, proxy) {
        let pos = proxy.getPosition(), scope = proxy.getScope(), duration = DateKit.getTime() - attrs.getStartTime(), newX = Math.round(pos.x), newY = Math.round(pos.y), time = 0, easing, momentumX, momentumY;
        proxy.setState(0);
        attrs.setEndTime(Date.now());
        if (this.isOutBoundary(pos, scope.getCrisisPosition())) {
            proxy.resetPosition();
            attrs.setState(0);
            return void 0;
        }
        proxy.scrollTo(newX, newY, 0, proxy.getAnimation());
        if (attrs.getState() === 1) {
            if (scope.isTapable()) {
                EventKit.tap(e, 'tap');
            }
            if (scope.isClickable()) {
                EventKit.click(e, 'click');
            }
            proxy.trigger('scroll:cancel', pos);
            attrs.setState(0);
            return void 0;
        }
        if (scope.isEnableMomentum() && this.isFastMoving(duration)) {
            momentumX = scope.getComputedMomontum(attrs.getOriginX(), duration, newX, false);
            momentumY = scope.getComputedMomontum(attrs.getOriginY(), duration, newY, true);
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            proxy.setState(1);
        }
        if (!this.equal(newX, pos.x) || !this.equal(newY, pos.y)) {
            if (this.isLarger(newX, 0) || this.isLarger(scope.getMaxDistance().x, newX) || this.isLarger(newY, 0) || this.isLarger(scope.getMaxDistance().y, newY)) {
                easing = new Quadratic();
                if (isString(proxy.getAnimation())) {
                    proxy.scrollTo(newX, newY, time, easing.style());
                }
                else {
                    proxy.scrollTo(newX, newY, time, easing.algorithm);
                }
            }
            else {
                proxy.scrollTo(newX, newY, time, proxy.getAnimation());
            }
            attrs.setState(0);
            return void 0;
        }
        attrs.setState(0);
        proxy.trigger('scroll:end', pos);
    }
}
