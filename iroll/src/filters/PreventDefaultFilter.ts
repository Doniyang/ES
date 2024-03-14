import RollFilter from "./RollFilter";

export default class PreventDefaultFilter extends RollFilter{
      constructor(){
        super()
      }  
      protected isSignal(scope: Scope): boolean {
        return scope.isSupportPrevent()
      }
    public doFilter(e:Event): void {
        if(this.isAttached){ e.preventDefault() }
    } 
}