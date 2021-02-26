import { DateKit, EventKit } from "../shared";
/**
 * @class RollProgress
 * @classdesc roll move
 * @author niyang
 */
export default class RollProgress {
    /**
     * @constructor
     */
    constructor() {
        this.delay = 300;
    }
    /**
     * @method scrollModeCalculation
     * @param absDistX
     * @param absDistY
     * @param scope
     * @description compute the scroll mode
     */
    scrollModeCalculation(absDistX, absDistY, scope) {
        if (scope.isNoLocked() && !scope.isFreeScroll()) {
            if (absDistX > absDistY + scope.getDirectionLockThreshold()) {
                scope.setScrollMode(1);
            }
            if (absDistY >= absDistX + scope.getDirectionLockThreshold()) {
                scope.setScrollMode(2);
            }
        }
    }
    deltaCalculation(deltaX, deltaY, scope) {
        let x = deltaX, y = deltaY;
        if (scope.isLockScrollX()) {
            y = 0;
        }
        if (scope.isLockScrollY()) {
            x = 0;
        }
        x = scope.isHScroll() ? x : 0;
        y = scope.isVScroll() ? y : 0;
        return { x, y };
    }
    /**
     * @method isLarger
     * @param a
     * @param b
     * @description compare a & b
     */
    isLarger(a, b) {
        return a > b;
    }
    isFastMove(start, end) {
        return this.isLarger((end - start), this.delay);
    }
    /**
     * @method attain
     * @param state
     * @description execute scroll move  or not
     */
    attain(state) {
        return state === 1;
    }
    /**
     * @method execute
     * @param e
     * @param attrs
     * @param proxy
     * @description execute roll move
     */
    execute(e, attrs, proxy) {
        if (proxy.disabled) {
            return;
        }
        let point = EventKit.isTouchEvent(e) ? e.touches[0] : e, scope = proxy.getScope(), pos = proxy.getPosition(), maxDist = scope.getMaxDistance(), timestamp = DateKit.getTime(), deltaX = point.pageX - attrs.getPointX(), deltaY = point.pageY - attrs.getPointY(), newX, newY, absDistX, absDistY;
        attrs.setPoint(point.pageX, point.pageY);
        attrs.setDestination(point.pageX, point.pageY);
        attrs.setDelta(attrs.getDeltaX() + deltaX, attrs.getDeltaY() + deltaY);
        absDistX = Math.abs(attrs.getDeltaX());
        absDistY = Math.abs(attrs.getDeltaY());
        if (this.isFastMove(timestamp, attrs.getEndTime()) && (this.isLarger(scope.getMomentumThreshold(), absDistX) && this.isLarger(scope.getMomentumThreshold(), absDistY))) {
            return void 0;
        }
        this.scrollModeCalculation(absDistX, absDistY, scope);
        if ((scope.isLockScrollX() && scope.isYPrevent()) || (scope.isLockScrollY() && scope.isXPrevent())) {
            e.preventDefault();
        }
        if ((scope.isLockScrollY() && scope.isYPrevent()) || (scope.isLockScrollX() && scope.isXPrevent())) {
            attrs.setState(0);
            return void 0;
        }
        const { x, y } = this.deltaCalculation(deltaX, deltaY, scope);
        newX = pos.x + x;
        newY = pos.y + y;
        if (this.isLarger(newX, 0) || this.isLarger(maxDist.x, newX)) {
            newX = scope.isBounce() ? pos.x + x / 3 : (this.isLarger(newX, 0) ? 0 : maxDist.x);
        }
        if (this.isLarger(newY, 0) || this.isLarger(maxDist.y, newY)) {
            newY = scope.isBounce() ? pos.y + y / 3 : (this.isLarger(newY, 0) ? 0 : maxDist.y);
        }
        scope.setScrollDirection(deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0, deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0);
        if (attrs.getState() === 1) {
            proxy.trigger('scroll:start', pos);
        }
        attrs.setState(2);
        proxy.translate(newX, newY);
        if (this.isLarger((timestamp - attrs.getStartTime()), 300)) {
            attrs.setStartTime(timestamp);
            attrs.setOrigin(pos.x, pos.y);
            if (scope.getProbe() === 1 /* Throttle */) {
                proxy.trigger('scroll', pos);
            }
        }
        if (this.isLarger(scope.getProbe(), 1 /* Throttle */)) {
            proxy.trigger('scroll', pos);
        }
    }
}
