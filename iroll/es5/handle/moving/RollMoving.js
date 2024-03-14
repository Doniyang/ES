import StopPropagationFilter from "../../filters/StopPropagationFilter";
import PreventDefaultFilter from "../../filters/PreventDefaultFilter";
import DirectionLockFilter from "../../filters/DirectionLockFilter";
import { EventKit, DateKit, ToolKit } from "../../shared";
export default class RollMoving {
    constructor() {
        this.prevention = new PreventDefaultFilter();
        this.propagation = new StopPropagationFilter();
        this.direction = new DirectionLockFilter();
    }
    attain(state) {
        return [1, 2].includes(state);
    }
    execute(e, scope, platform) {
        this.prevention.attach(scope);
        this.prevention.doFilter(e);
        this.propagation.attach(scope);
        this.prevention.doFilter(e);
        const { pageX, pageY } = EventKit.isTouchEvent(e) ? e.touches[0] : e;
        const beta = scope.getBeta();
        let deltaX = pageX - beta.x;
        let deltaY = pageY - beta.y;
        const theta = scope.getTheta();
        const thetaX = theta.x + deltaX;
        const thetaY = theta.y + deltaY;
        const timestamp = DateKit.getTime();
        const absThetaX = Math.abs(thetaX);
        const absThetaY = Math.abs(thetaY);
        scope.setTheta(thetaX, thetaY);
        scope.setBeta(pageX, pageY);
        if (scope.isInvalidSlip(timestamp, absThetaX, absThetaY)) {
            return void 0;
        }
        scope.updateMode(absThetaX, absThetaY);
        this.direction.attach(scope);
        this.direction.doFilter(e);
        if (scope.isLockScrollX()) {
            if (scope.isPreventScrollX()) {
                return void 0;
            }
            deltaY = 0;
        }
        if (scope.isLockScrollY()) {
            if (scope.isPreventScrollY()) {
                return void 0;
            }
            deltaX = 0;
        }
        deltaX = scope.isHorizontalScroll() ? deltaX : 0;
        deltaY = scope.isVerticalScroll() ? deltaY : 0;
        scope.setDelta(deltaX, deltaY);
        const pos = scope.getZeta();
        let newX = pos.x + deltaX;
        let newY = pos.y + deltaY;
        if (ToolKit.isLessThan(0, newX) || ToolKit.isLessThan(newX, scope.getMaxScrollX())) {
            newX = scope.isSupportBouce() ? (pos.x + deltaX / 3) : ToolKit.isLessThan(0, newX) ? 0 : scope.getMaxScrollX();
        }
        if (ToolKit.isLessThan(0, newY) || ToolKit.isLessThan(newY, scope.getMaxScrollY())) {
            newY = scope.isSupportBouce() ? (pos.y + deltaY / 3) : ToolKit.isLessThan(0, newY) ? 0 : scope.getMaxScrollY();
        }
        let directionX = ToolKit.isLessThan(0, deltaX) ? -1 : ToolKit.isLessThan(deltaX, 0) ? 1 : 0;
        let directionY = ToolKit.isLessThan(0, deltaY) ? -1 : ToolKit.isLessThan(deltaY, 0) ? 1 : 0;
        scope.setKappa(directionX, directionY);
        if (scope.getState() === 1) {
            scope.setState(2);
            platform.trigger('scroll:start', pos);
        }
        platform.translate(newX, newY);
        if (scope.isValidSlip(timestamp)) {
            scope.setScrollStartTime(timestamp);
            scope.setEta(pos.x, pos.y);
            if (scope.getProbeType() === 1) {
                platform.trigger('scroll:start', scope.getZeta());
            }
        }
        if (ToolKit.isLessThan(1, scope.getProbeType())) {
            platform.trigger('scroll:start', scope.getZeta());
        }
    }
}
