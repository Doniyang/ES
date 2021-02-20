import Scope from "../scope/Scope";
import EventKit from "../utils/EventKit";
import Attribute from "../attribute/Attribute";
import RollProxy from "../translate/RollProxy";
import Digitalizer from "./Digitalizer";
import DateKit from "src/utils/DateKit";

export default class RollProgress implements Digitalizer {
    private isLarger(a: number, b: number) {
        return a > b
    }
    attain(state: number): boolean {
        return state === 1
    }
    execute(e: TouchEvent | MouseEvent, attrs: Attribute, proxy: RollProxy): void {
        if (proxy.disabled) { return; }
        let point = EventKit.isTouchEvent(e) ? e.touches[0] : e,
            scope: Scope = proxy.getScope(),
            pos: ScrollKit.Point = proxy.getPosition(),
            maxDist: ScrollKit.Point = scope.getMaxDistance(),
            timestamp = DateKit.getTime(),
            deltaX = point.pageX - attrs.getPointX(),
            deltaY = point.pageY - attrs.getPointY(),
            newX, newY,
            absDistX, absDistY;

        attrs.setPoint(point.pageX, point.pageY);
        attrs.setDestination(point.pageX, point.pageY);
        attrs.setDelta(attrs.getDeltaX() + deltaX, attrs.getDeltaY() + deltaY);

        absDistX = Math.abs(attrs.getDeltaX());
        absDistY = Math.abs(attrs.getDeltaY());

        if (this.isLarger((timestamp - attrs.getEndTime()), 300) && (this.isLarger(10, absDistX) && this.isLarger(10, absDistY))) { return void; }

        if (scope.isNoLocked() && !scope.isFreeScroll()) {
            if (absDistX > absDistY + scope.getDirectionLockThreshold()) {
                scope.setScrollMode(1)
            } else if (absDistY >= absDistX + scope.getDirectionLockThreshold()) {
                scope.setScrollMode(2)
            } else {
                scope.setScrollMode(0)
            }
        }

        if (scope.isHScroll()) {
            if (scope.isYPrevent()) {
                e.preventDefault()
            }
            if (scope.isXPrevent()) {
                attrs.setState(0);
                return void;
            }
            deltaY = 0
        }
        if (scope.isVScroll()) {
            if (scope.isXPrevent()) {
                e.preventDefault()
            }
            if (scope.isYPrevent()) {
                attrs.setState(0);
                return void;
            }
            deltaX = 0
        }

        deltaX = scope.isHScroll() ? deltaX : 0
        deltaY = scope.isVScroll() ? deltaY : 0

        newX = pos.x + deltaX;
        newY = pos.y + deltaY;

        if (this.isLarger(newX, 0) || this.isLarger(maxDist.x, newX)) {
            newX = scope.isBounce() ? pos.x + deltaX / 3 : (this.isLarger(newX, 0) ? 0 : maxDist.x)
        }

        if (this.isLarger(newY, 0) || this.isLarger(maxDist.y, newY)) {
            newY = scope.isBounce() ? pos.y + deltaY / 3 : (this.isLarger(newY, 0) ? 0 : maxDist.y)
        }


        if (attrs.getState() !== 2) {
            proxy.trigger('scroll:start', pos)
        }

        attrs.setState(2);

        proxy.translate(newX, newY);

        if (this.isLarger((timestamp - attrs.getStartTime()), 300)) {
            attrs.setStartTime(timestamp)
            attrs.setOrigin(pos.x, pos.y)
        }
    }

}