import RollFilter from "./RollFilter";
export default class PreventDefaultFilter extends RollFilter {
    constructor() {
        super();
    }
    isSignal(scope) {
        return scope.isSupportPrevent();
    }
    doFilter(e) {
        if (this.isAttached) {
            e.preventDefault();
        }
    }
}
