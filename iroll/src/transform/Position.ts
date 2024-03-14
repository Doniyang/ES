import Digitalizer from "./Digitalizer";

export default class Position implements Digitalizer{
    readonly scope:Scope
    constructor(scope:Scope){
      this.scope = scope
    }
    /**
      * @description get element position
      * @param el 
      * @returns 
      */ 
    getComputedPosition(): RollKit.Point {
      let marix: CSSStyleDeclaration = window.getComputedStyle(this.scope.getRollElement(), null);
      let x = 0, y = 0;
      x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
      y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
      return { x, y }
    }
     /**
       * @description translate to x,y
       * @param x 
       * @param y 
       */
    translate(x: number, y: number): void {
       const rollElement = this.scope.getRollElement()
       rollElement.style.setProperty('left', x + 'px')
       rollElement.style.setProperty('top', y + 'px')
       this.scope.setZeta(x,y)
    }
    // 
    destory(): void {
      
    }
}