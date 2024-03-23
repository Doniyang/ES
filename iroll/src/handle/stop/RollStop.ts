import Digitalizer from "../Digitalizer";
import { EaseOutQuard } from "@niyang-es/toolkit";
import PreventDefaultFilter from "../../filters/PreventDefaultFilter";
import { EventKit, State, DateKit, ToolKit, Direction } from "../../shared";
import StopPropagationFilter from "../../filters/StopPropagationFilter";

export default class RollStop implements Digitalizer {
    /**
     * @name prevention
     */
    private prevention: PreventDefaultFilter
    /**
     * @name propagation
     */
    private propagation: StopPropagationFilter

    constructor() {
        this.prevention = new PreventDefaultFilter()
        this.propagation = new StopPropagationFilter()
    }
    /**
     * @method attain
     * @param state 
     * @returns 
     */
    public attain(state: number): boolean {
        return [State.Start, State.Moving].includes(state)
    }
    /**
     * @method execute
     * @param e 
     * @param scope 
     * @param platform 
     * @returns 
     */
    public execute(e: TouchEvent | MouseEvent, scope: Scope, platform: Platform): void {

        this.prevention.attach(scope)
        this.prevention.doFilter(e)

        this.propagation.attach(scope)
        this.propagation.doFilter(e)

        const { pageX, pageY } = EventKit.isTouchEvent(e) ? e.changedTouches[0] : e
        scope.setBeta(pageX, pageY)
        scope.setScrollStopTime(DateKit.getTime())
        let duration = scope.getTaskTime()
        const pos = scope.getZeta()
        let newX = Math.round(pos.x)
        let newY = Math.round(pos.y)
        const iota = scope.getIota()

        let deltaX = newX - iota.x
        let deltaY = newY - iota.y
        const eta = scope.getEta()
        let absDistX = Math.abs(newX - eta.x)
        let absDistY = Math.abs(newY - eta.y)

        let directionX = ToolKit.isLessThan(0, deltaX) ? Direction.Negative : ToolKit.isLessThan(deltaX, 0) ? Direction.Positive : Direction.Zero;
        let directionY = ToolKit.isLessThan(0, deltaY) ? Direction.Negative : ToolKit.isLessThan(deltaY, 0) ? Direction.Positive : Direction.Zero;
        scope.setKappa(directionX, directionY)

        if (scope.getState() === State.Start) {
            if (scope.isSupportTap()) {
                EventKit.tap(e, 'tap')
            }
            if (scope.isSupportClick()) {
                EventKit.click(e, 'click')
            }

            platform.trigger('scroll:cancel')
            scope.setState(State.None)
            return void 0
        }

        if (scope.isOutBoundary()) {
            platform.reset()
            scope.setState(State.None)
            return void 0
        }

        if (scope.isSupportFlick(duration, absDistX, absDistY)) {
            EventKit.click(e, 'flick')
            scope.setState(State.None)
            return void 0
        }

        scope.setState(State.Stop)
        platform.scrollTo(newX, newY, 0)

        let time = 0
        if (scope.isSupportMomentum(duration, absDistX, absDistY)) {
            let momentumX = scope.directionXCalc(duration, newX)
            let momentumY = scope.directionYCalc(duration, newY)

            newX = momentumX.destination
            newY = momentumY.destination
            time = Math.max(momentumX.duration, momentumY.duration)
        }

        const { x, y } = scope.getZeta()

        if (newX != x || newY != y) {
            let easing
            // change easing function when scroller goes out of the boundaries
            if (ToolKit.isLessThan(0, newX) || ToolKit.isLessThan(newX, scope.getMaxScrollX()) || ToolKit.isLessThan(0, newY) || ToolKit.isLessThan(newY, scope.getMaxScrollY())) {
                easing = new EaseOutQuard()
            }

            platform.scrollTo(newX, newY, time, easing);
            return void 0;
        }

        platform.trigger('scroll:end', { x, y })

    }
}