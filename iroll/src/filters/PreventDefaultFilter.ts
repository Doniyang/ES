import RollFilter from "./RollFilter";

export default class PreventDefaultFilter extends RollFilter {
  constructor() {
    super()
  }
  /**
   * @method isSignal
   * @param scope 
   * @returns 
   */
  protected isSignal(scope: Scope): boolean {
    return scope.isSupportPrevent()
  }
  /**
  * @method doFilter
  * @param e 
  */
  public doFilter(e: Event): void {
    if (this.isAttached) { e.preventDefault() }
  }
}