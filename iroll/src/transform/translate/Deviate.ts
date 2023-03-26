import Digitalizer from "./Digitalizer";

export default class Deviate implements Digitalizer {
  constructor(){}
  
    /**
      * @description get element position
      * @param el 
      * @returns 
      */ 
  getComputedPosition(el: HTMLElement): ScrollKit.Point {
    let marix: CSSStyleDeclaration = window.getComputedStyle(el, null);
    let x = 0, y = 0;
    x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
    y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
    return { x, y }
  }
   /**
     * @description translate to x,y
     * @param x 
     * @param y 
     * @param scrollStyle 
     */
  translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void {
    scrollStyle.setProperty('top', Math.round(y) + 'px');
    scrollStyle.setProperty('left', Math.round(x) + 'px');
  }

} 