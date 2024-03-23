import { EaseOutQuard } from "@niyang-es/toolkit";
import PreventDefaultFilter from "../../filters/PreventDefaultFilter";
import { EventKit, DateKit, ToolKit } from "../../shared";
import StopPropagationFilter from "../../filters/StopPropagationFilter";
export default class RollStop {
    constructor() {
        this.prevention = new PreventDefaultFilter();
        this.propagation = new StopPropagationFilter();
    }
    attain(state) {
        return [1, 2].includes(state);
    }
    execute(e, scope, platform) {
        this.prevention.attach(scope);
        this.prevention.doFilter(e);
        this.propagation.attach(scope);
        this.propagation.doFilter(e);
        const { pageX, pageY } = EventKit.isTouchEvent(e) ? e.changedTouches[0] : e;
        scope.setBeta(pageX, pageY);
        scope.setScrollStopTime(DateKit.getTime());
        let duration = scope.getTaskTime();
        const pos = scope.getZeta();
        let newX = Math.round(pos.x);
        let newY = Math.round(pos.y);
        const iota = scope.getIota();
        let deltaX = newX - iota.x;
        let deltaY = newY - iota.y;
        const eta = scope.getEta();
        let absDistX = Math.abs(newX - eta.x);
        let absDistY = Math.abs(newY - eta.y);
        let directionX = ToolKit.isLessThan(0, deltaX) ? -1 : ToolKit.isLessThan(deltaX, 0) ? 1 : 0;
        let directionY = ToolKit.isLessThan(0, deltaY) ? -1 : ToolKit.isLessThan(deltaY, 0) ? 1 : 0;
        scope.setKappa(directionX, directionY);
        if (scope.getState() === 1) {
            if (scope.isSupportTap()) {
                EventKit.tap(e, 'tap');
            }
            if (scope.isSupportClick()) {
                EventKit.click(e, 'click');
            }
            platform.trigger('scroll:cancel');
            scope.setState(0);
            return void 0;
        }
        if (scope.isOutBoundary()) {
            platform.reset();
            scope.setState(0);
            return void 0;
        }
        if (scope.isSupportFlick(duration, absDistX, absDistY)) {
            EventKit.click(e, 'flick');
            scope.setState(0);
            return void 0;
        }
        scope.setState(3);
        platform.scrollTo(newX, newY, 0);
        let time = 0;
        if (scope.isSupportMomentum(duration, absDistX, absDistY)) {
            let momentumX = scope.directionXCalc(duration, newX);
            let momentumY = scope.directionYCalc(duration, newY);
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
        }
        const { x, y } = scope.getZeta();
        if (newX != x || newY != y) {
            let easing;
            if (ToolKit.isLessThan(0, newX) || ToolKit.isLessThan(newX, scope.getMaxScrollX()) || ToolKit.isLessThan(0, newY) || ToolKit.isLessThan(newY, scope.getMaxScrollY())) {
                easing = new EaseOutQuard();
            }
            platform.scrollTo(newX, newY, time, easing);
            return void 0;
        }
        platform.trigger('scroll:end', { x, y });
    }
}
