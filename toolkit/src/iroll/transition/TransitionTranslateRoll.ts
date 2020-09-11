import RollDigitalizer from "../RollDigitalizer";
import Transition from "./Transition";
import Scope from "../scope/Scope";

export default class TransitionTranslateRoll implements RollDigitalizer {
    readonly mode: number
    private transition: Transition;
    private easingStyle: string;
    private scope: Scope;
    constructor(scope: Scope, style: string) {
        this.mode = 2
        this.transition = new Transition();
        this.scope = scope;
        this.easingStyle = style;
    }

    private isRapid() {
        return true
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
        return this.mode === 2
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
        let matrixs: string[] = marix.getPropertyValue(PrefixStyle.style('transform')).split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
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
        let scrollStyle = this.getScrollStyle();
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isRapid() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
    }

    scrollTo(x: number, y: number, time: number): void {
        this.transition.duration(time, this.getScrollStyle())
        this.transition.timing(this.easingStyle, this.getScrollStyle());
        this.translate(x, y);
    }

}