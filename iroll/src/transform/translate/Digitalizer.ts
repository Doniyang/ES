export default interface Digitalizer{
  translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void;
  getComputedPosition(el: HTMLElement): ScrollKit.Point;
}