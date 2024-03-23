import { PrefixStyle } from "@niyang-es/toolkit";
import Digitalizer from "./Digitalizer";

export default class Position implements Digitalizer {
  private readonly scope: Scope
  constructor(scope: Scope) {
    this.scope = scope
  }
  /**
    * @description get element position
    * @param el 
    * @returns 
    */
  public getComputedPosition(): RollKit.Point {
    let marix: CSSStyleDeclaration = window.getComputedStyle(this.scope.getRollElement(), null);
    let x = 0, y = 0;
    x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
    y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
    return { x, y }
  }
  /**
   * set transition-property
   */
  public rule(): void {
    const ruleKey = 'transition-property'
    const transition = PrefixStyle.style(ruleKey)
    const rollElement = this.scope.getRollElement()
    rollElement.style.setProperty(transition, 'top,left')
    rollElement.style.setProperty(ruleKey, 'top,left')
  }
  /**
    * @description translate to x,y
    * @param x 
    * @param y 
    */
  public translate(x: number, y: number): void {
    const rollElement = this.scope.getRollElement()
    rollElement.style.setProperty('left', x + 'px')
    rollElement.style.setProperty('top', y + 'px')
    this.scope.setZeta(x, y)
  }
}