import RollFilter from "./RollFilter";

export default class DirectionLockFilter extends RollFilter{
   constructor(){ super() }
   
    protected isSignal(scope: Scope): boolean {
       return (scope.isLockScrollX() && scope.isPreventScrollY()) || (scope.isLockScrollY() && scope.isPreventScrollX())
    }
    public doFilter(e: Event): void {
       e.preventDefault()
    }
    
}