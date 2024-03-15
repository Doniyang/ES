import RollFilter from "./RollFilter";

export default class DirectionLockFilter extends RollFilter{
   constructor(){ super() }
    /**
     * @method isSignal
     * @param scope 
     * @returns 
     */ 
    protected isSignal(scope: Scope): boolean {
       return (scope.isLockScrollX() && scope.isPreventScrollY()) || (scope.isLockScrollY() && scope.isPreventScrollX())
    }
    /**
     * @method doFilter
     * @param e 
     */
    public doFilter(e: Event): void {
       e.preventDefault()
    }
}