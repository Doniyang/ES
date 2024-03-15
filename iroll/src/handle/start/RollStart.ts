import Digitalizer from "../Digitalizer";
import { State, MouseButton, Lock } from "../../shared/enum"
import PreventDefaultFilter from "../../filters/PreventDefaultFilter";
import StopPropagationFilter from "../../filters/StopPropagationFilter";
import { DateKit, EventKit } from "../../shared";

export default class RollStart implements Digitalizer {
  /**
   * @name prevention 
   */
  private prevention: PreventDefaultFilter;
   /**
   * @name propagation 
   */
  private propagation: StopPropagationFilter;
  /**
   * @name button
   */
  private button: number
  constructor() {
    this.prevention = new PreventDefaultFilter()
    this.propagation = new StopPropagationFilter()
    this.button = 0
  }

  /**
  * @method updateMouseButton
  * @param e
  */
  private updateMouseButton(e: MouseEvent) {
    if (!e.which) {
      this.button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2);
    } else {
      this.button = e.button;
    }
  }

  /**
   * @method isValidButton
   * @description make sure that mouse event dispatch by left button
   */
  private isValidButton() {
    return this.button === MouseButton.Left
  }
  /**
   * @method attain
   * @param state 
   * @returns 
   */
  public attain(state: number) {
    return state === State.None
  }
  /**
   * @method execute
   * @param e 
   * @param scope 
   * @param platform 
   * @returns 
   */
  public execute(e: MouseEvent | TouchEvent, scope: Scope, platform: Platform): void {
    if (!EventKit.isTouchEvent(e)) { this.updateMouseButton(e) }

    if (!this.isValidButton()) {
      scope.setState(State.None)
      return void 0
    }


    this.prevention.attach(scope)
    this.prevention.doFilter(e)

    this.propagation.attach(scope)
    this.prevention.doFilter(e)

    platform.stop()

    scope.setState(State.Start)
    scope.setMode(Lock.Auto)

    const { pageX, pageY } = EventKit.isTouchEvent(e) ? e.touches[0] : e
    const { x, y } = scope.getZeta()

    scope.setScrollStartTime(DateKit.getTime())
    scope.setTheta(0, 0)
    scope.setEta(x, y)
    scope.setIota(x, y)
    scope.setBeta(pageX, pageY)
    platform.trigger('scroll:bofore', scope.getZeta());

  }
}