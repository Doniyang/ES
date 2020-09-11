import RollDigitalizer from "../RollDigitalizer";
import Scope from "../scope/Scope";
import Transition from "./Transition";

export default class TransitionRoll implements RollDigitalizer {
    readonly mode: number
    private transition: Transition;
    private scope: Scope;
    private easingStyle: string;
    constructor(scope: Scope, style: string) {
        this.mode = 1
        this.transition = new Transition();
        this.scope = scope;
        this.easingStyle = style;
    }
    private getScrollElement(): HTMLElement {
        return this.scope.getScrollElement()
    }

    private getScrollStyle(): CSSStyleDeclaration {
        return this.getScrollElement().style;
    }

    isFreeScroll(): boolean {
        return this.scope.isAxisScroll();
    }

    isHScroll(): boolean {
        return this.scope.isLockAxisXScroll();
    }

    isVScroll(): boolean {
        return this.scope.isLockAxisYScroll();
    }

    isHPassthrough(): boolean {
        return this.scope.isAxisXPassthrough()
    }

    isVPassthrough(): boolean {
        return this.scope.isAxisYPassthrough()
    }

    isTransition(): boolean {
        return this.mode === 1
    }

    isResilient(): boolean {
        return this.scope.isBounce()
    }

    isOnRush(): boolean {
        return this.scope.isMomentum()
    }

    getDirectionLockThreshold(): number {
        return this.scope.getThreshold()
    }

    getMaxScroll(): ScrollKit.Point {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
    }

    getPosition(): ScrollKit.Point {
        return this.scope.position();
    }

    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.getScrollElement(), null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y }
    }

    stop(): void {
        let pos = this.getComputedPosition();
        this.transition.duration(0, this.getScrollStyle());
        this.translate(pos.x, pos.y);
        this.setState(0);
    }

    getState(): number {
        return this.transition.getState();
    }

    setAnimation(style: string) {
        this.easingStyle = style
    }

    setState(state: number): void {
        this.transition.setState(state);
    }

    translate(x: number, y: number) {
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxis(x, y);
    }
    scrollTo(x: number, y: number, time: number): void {
        this.transition.duration(time, this.getScrollStyle())
        this.transition.timing(this.easingStyle, this.getScrollStyle());
        this.translate(x, y);
    }
}