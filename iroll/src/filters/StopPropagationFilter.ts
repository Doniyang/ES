import RollFilter from "./RollFilter";

export default class StopPropagationFilter extends RollFilter{
   constructor(){ super() }
     /**
      * @method isSignal
      * @param scope 
      * @returns 
      */
    protected isSignal(scope: Scope): boolean {
        return scope.isStopPropagation();
    }
    /**
     * @method doFilter
     * @param e 
     */
    public doFilter(e: Event): void {
        if(this.isAttached) e.stopPropagation()
    }
}