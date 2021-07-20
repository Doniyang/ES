export default interface Vialog {
    translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void;

    getComputedPosition(el: HTMLElement): ScrollKit.Point;
}
