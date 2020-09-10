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
    getPosition(): ScrollKit.Point {
       return this.scope.position();
    }
    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.transition.getScrollElement(), null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y }
    }
    stop(): void {
        let pos = this.getComputedPosition();
        this.transition.duration(0);
        this.translate(pos.x, pos.y);
        this.setState(0);
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