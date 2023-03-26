import {PrefixStyle} from "@niyang-es/toolkit";
import Digitalizer from "./Digitalizer";

export default class Translate implements Digitalizer{
  
  /**
   * @description hard software Compositing
   */
  private readonly HWCompositing: boolean;

    constructor(HWCompositing:boolean) {
        this.HWCompositing = HWCompositing
    }

    /**
     * @description translate to x,y
     * @param x 
     * @param y 
     * @param scrollStyle 
     */
    translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void {
        let transform = PrefixStyle.style('transform');
        let translateZ = this.HWCompositing ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
    }
     /**
      * @description get element position
      * @param el 
      * @returns 
      */ 
    getComputedPosition(el: HTMLElement): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(el, null);
        let x = 0, y = 0;
        let transform: string = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform')
        let matrixs: string[] = transform.split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return {x, y}
    }
  
}