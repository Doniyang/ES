import { PrefixStyle } from "@niyang-es/toolkit";
import Digitalizer from "./Digitalizer";

export default class Transform implements Digitalizer{
    /**
   * @description hard software Compositing
   */
    private readonly scope: Scope;

    constructor(scope:Scope) {
      this.scope = scope
    }
    /**
     * @method getComputedPosition
     * @returns {x,y}
     */
    public getComputedPosition(): RollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.scope.getRollElement(), null);
        let x = 0, y = 0;
        let transform: string = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform')
        let matrixs: string[] = transform.split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return { x, y }
    }
    /**
     * set transition-property
     */
    public rule(): void {
        const ruleKey = 'transition-property'
        const transition = PrefixStyle.style(ruleKey)
        const valueKey = 'transform'
        const transform:string = PrefixStyle.style(valueKey);
        const rollElement = this.scope.getRollElement()
        rollElement.style.setProperty(transition,transform)
        rollElement.style.setProperty(ruleKey,valueKey)
    }
    /**
     * @method translate
     * @param x 
     * @param y 
     */
    public translate(x: number, y: number): void {
        const ruleKey = 'transform'
        const transform:string = PrefixStyle.style(ruleKey);
        const translateZ = this.scope.isSupportHardFast() ? 'translateZ(0)' : '';
        const rollElement = this.scope.getRollElement()
        const rule = `translate(${x}px,${y}px) ${translateZ}` 
        rollElement.style.setProperty(transform,rule)
        rollElement.style.setProperty(ruleKey,rule)
        this.scope.setZeta(x,y)
    }
}