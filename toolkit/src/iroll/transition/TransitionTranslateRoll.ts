import RollDigitalizer from "../RollDigitalizer";
import Transition from "./Transition";
import Scope from "../scope/Scope";
import PrefixStyle from "../../dom/PrefixStyle";

export default class TransitionTranslateRoll implements RollDigitalizer {
    private transition: Transition;
    private easingStyle: string;
    private scope: Scope;
    private HWCompositing: boolean;
    constructor(el: HTMLElement, scope: Scope, style: string, isComposition: boolean) {
        this.transition = new Transition(el);
        this.scope = scope;
        this.easingStyle = style;
        this.HWCompositing = isComposition;
    }
    getPosition(): ScrollKit.Point {
        return this.scope.position();
     }
    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.transition.getScrollElement(), null);
        let x = 0, y = 0;
        let matrixs: string[] = marix.getPropertyValue(PrefixStyle.style('transform')).split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
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

    private isRapid() {
        return this.HWCompositing && PrefixStyle.has(PrefixStyle.style('perspective'))
    }

    translate(x: number, y: number) {
        let scrollStyle = this.transition.getScrollStyle();
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isRapid() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
    }

    scrollTo(x: number, y: number, time: number): void {
        this.transition.duration(time)
        this.transition.timing(this.easingStyle);
        this.translate(x, y);
    }

}