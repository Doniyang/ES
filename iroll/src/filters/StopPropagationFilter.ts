import RollFilter from "./RollFilter";

export default class StopPropagationFilter extends RollFilter{
   constructor(){ super() }
   
    protected isSignal(scope: Scope): boolean {
        return scope.isStopPropagation();
    }
    public doFilter(e: Event): void {
        if(this.isAttached) e.stopPropagation()
    }
}