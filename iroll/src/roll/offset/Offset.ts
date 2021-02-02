import Variate from "../Variate";

export default class Offset implements Variate{
    translate(x: number, y: number,scrollStyle: CSSStyleDeclaration): void {
        scrollStyle.setProperty('top',Math.round(y)+'px');
        scrollStyle.setProperty('left',Math.round(x)+'px');
    }
}