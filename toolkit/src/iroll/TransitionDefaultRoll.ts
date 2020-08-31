import Digitalizer from "./Digitalizer";
import Scope from "./Scope";
import Transition from "./Transition";

export default class TransitionDefaultRoll extends Transition implements Digitalizer {
    private scope: Scope;
    private easeStyle: string;
    constructor(el: HTMLElement, scope: Scope, style: string) {
        super(el);
        this.scope = scope;
        this.easeStyle = style;
    }

    translate(x: number, y: number) {
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxisX(x);
        this.scope.setAxisY(y);
    }
    scrollTo(x: number, y: number, time: number): void {
        this.duration(time)
        this.timing(this.easeStyle);
        this.translate(x, y);
    }
}