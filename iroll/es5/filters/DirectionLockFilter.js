import RollFilter from "./RollFilter";
export default class DirectionLockFilter extends RollFilter {
    constructor() { super(); }
    isSignal(scope) {
        return (scope.isLockScrollX() && scope.isPreventScrollY()) || (scope.isLockScrollY() && scope.isPreventScrollX());
    }
    doFilter(e) {
        e.preventDefault();
    }
}
