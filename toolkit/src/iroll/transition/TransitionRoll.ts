import RollDigitalizer from "../RollDigitalizer";
import Scope from "../scope/Scope";
import Transition from "./Transition";

export default class TransitionRoll implements RollDigitalizer {
    private transition: Transition;
    private scope: Scope;
    private easingStyle: string;
    constructor(el: HTMLElement, scope: Scope, style: string) {
        this.transition = new Transition(el);
        this.scope = scope;
        this.easingStyle = style;
    }
    getState(): number {
      return this.transition.getState();
    }
    setState(state: number): void {
        this.transition.setState(state);
    }

    translate(x: number, y: number) {
        let scrollStyle: CSSStyleDeclaration = this.transition.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxis(x, y);
    }
    scrollTo(x: number, y: number, time: number): void {
        this.transition.duration(time)
        this.transition.timing(this.easingStyle);
        this.translate(x, y);
    }
}