import RollFilter from "./RollFilter";
export default class StopPropagationFilter extends RollFilter {
    constructor() { super(); }
    isSignal(scope) {
        return scope.isStopPropagation();
    }
    doFilter(e) {
        if (this.isAttached)
            e.stopPropagation();
    }
}
