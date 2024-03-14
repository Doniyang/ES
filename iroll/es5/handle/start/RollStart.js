import PreventDefaultFilter from "../../filters/PreventDefaultFilter";
import StopPropagationFilter from "../../filters/StopPropagationFilter";
import { DateKit, EventKit } from "../../shared";
export default class RollStart {
    constructor() {
        this.prevention = new PreventDefaultFilter();
        this.propagation = new StopPropagationFilter();
        this.button = 0;
    }
    updateMouseButton(e) {
        if (!e.which) {
            this.button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2);
        }
        else {
            this.button = e.button;
        }
    }
    isValidButton() {
        return this.button === 0;
    }
    attain(state) {
        return state === 0;
    }
    execute(e, scope, platform) {
        if (!EventKit.isTouchEvent(e)) {
            this.updateMouseButton(e);
        }
        if (!this.isValidButton()) {
            scope.setState(0);
            return void 0;
        }
        this.prevention.attach(scope);
        this.prevention.doFilter(e);
        this.propagation.attach(scope);
        this.prevention.doFilter(e);
        platform.stop();
        scope.setState(1);
        scope.setMode(0);
        const { pageX, pageY } = EventKit.isTouchEvent(e) ? e.touches[0] : e;
        const { x, y } = scope.getZeta();
        scope.setScrollStartTime(DateKit.getTime());
        scope.setTheta(0, 0);
        scope.setEta(x, y);
        scope.setIota(x, y);
        scope.setBeta(pageX, pageY);
        platform.trigger('scroll:bofore', scope.getZeta());
    }
}
