import RollDigitalizer from "../RollDigitalizer";
import Transition from "./Transition";
import Scope from "../scope/Scope";
import PrefixStyle from "../../dom/PrefixStyle";

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

    private getZonePosition(): ScrollKit.Point {
        let pos = this.getPosition();
        let x = pos.x, y = pos.y;
        //左边
        if (!this.isHScroll() || pos.x > 0) {
            x = 0
        } else if (pos.x < this.scope.getMaxScrollWidth()) {//右边
            x = this.scope.getMaxScrollWidth()
        }
        //上边
        if (!this.isVScroll() || pos.y > 0) {
            y = 0
        } else if (pos.y < this.scope.getMaxScrollHeight()) {//下边
            y = this.scope.getMaxScrollHeight()
        }
        return { x, y }
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

    isPeak(): boolean {
        let pos = this.getPosition(),
            zone = this.getZonePosition();
        return pos.x === zone.x && pos.y === zone.y
    }

    isOnRush(): boolean {
        return this.scope.isMomentum()
    }

    isClickable(): boolean {
        return this.scope.isClickable();
     }
     
     isTapable(): boolean {
        return this.scope.isTap();
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

    getSize(): ScrollKit.Point {
        return { x: this.scope.getClientWidth(), y: this.scope.getClientHeight() }
    }

    getDeceleration():number{
        return this.scope.getDeceleration();
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

    resetPosition(): void {
        let time = this.scope.getBounceTime(),
            pos = this.getZonePosition();
        this.scrollTo(pos.x, pos.y, time);
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
        scrollStyle.cssText = `${transform} : translate(${x}px,${y}px) ${translateZ}`;;
    }

    scrollTo(x: number, y: number, time: number): void {
        this.transition.duration(time, this.getScrollStyle())
        this.transition.timing(this.easingStyle, this.getScrollStyle());
        this.translate(x, y);
    }

}