import Variate from "../Variate";

export default class Deviation implements Variate {
    constructor() { }

    getComputedPosition(el: HTMLElement): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(el, null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y }
    }
    
    translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void {
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
    }
}