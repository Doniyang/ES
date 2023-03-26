import {isString, Quadratic} from "@niyang-es/toolkit";
import Attribute from "../attribute/Attribute";
import Scope from "../scope/Scope";
import {DateKit, EventKit} from "../shared";
import RollProxy from "../transform/RollProxy";
import Digitalizer from "./Digitalizer";

export default class RollStop implements Digitalizer {
    readonly delay: number

    constructor() {
        this.delay = 300
    }

    private isOutBoundary(prev: ScrollKit.Point, next: ScrollKit.Point) {
        return !(prev.x === next.x && prev.y === next.y)
    }

    private isFastMoving(duration: number) {
        return duration < this.delay
    }

    private equal(a: number, b: number) {
        return a === b
    }

    private isLarger(a: number, b: number) {
        return a > b
    }

    attain(state: number): boolean {
        return state === 2 || state === 1;
    }

    execute(e: TouchEvent | MouseEvent, attrs: Attribute, proxy: RollProxy): void {
        const pos: ScrollKit.Point = proxy.getPosition(),
            scope: Scope = proxy.getScope(),
            duration = DateKit.getTime() - attrs.getStartTime();
        let newX = Math.round(pos.x),
            newY = Math.round(pos.y),
            time = 0,
            easing: Quadratic,
            momentumX: ScrollKit.Momentum,
            momentumY: ScrollKit.Momentum;

        proxy.setState(0)
        attrs.setEndTime(Date.now())

        if (this.isOutBoundary(pos, scope.getCrisisPosition())) {
            proxy.resetPosition();
            attrs.setState(0)
            return void 0;
        }

        proxy.scrollTo(newX, newY, 0, proxy.getAnimation());

        if (attrs.getState() === 1) {
            if (scope.isTapable()) {
                EventKit.tap(e, 'tap')
            }
            if (scope.isClickable()) {
                EventKit.click(e, 'click')
            }
            proxy.trigger('scroll:cancel', pos)
            attrs.setState(0)
            return void 0;
        }

        if (scope.shouldMomentum() && this.isFastMoving(duration)) {
            momentumX = scope.getComputedMomontum(attrs.getOriginX(), duration, newX, false)
            momentumY = scope.getComputedMomontum(attrs.getOriginY(), duration, newY, true)
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            proxy.setState(1)
        }

        if (!this.equal(newX, pos.x) || !this.equal(newY, pos.y)) {
            if (this.isLarger(newX, 0) || this.isLarger(scope.getMaxDistance().x, newX) || this.isLarger(newY, 0) || this.isLarger(scope.getMaxDistance().y, newY)) {
                easing = new Quadratic();
                if (isString(proxy.getAnimation())) {
                    proxy.scrollTo(newX, newY, time, easing.style());
                } else {
                    proxy.scrollTo(newX, newY, time, easing.algorithm);
                }
            } else {
                proxy.scrollTo(newX, newY, time, proxy.getAnimation());
            }
            attrs.setState(0)
            return void 0;
        }

        attrs.setState(0)
        proxy.trigger('scroll:end', pos)

    }
}
