import RollDigitalizer from "../RollDigitalizer";
import AnimationRoll from "../animation/AnimationRoll";
import Scope from "../scope/Scope";
import Factory from "../../anmiation/Factory";
import AnimationTranslateRoll from "../animation/AnimationTranslateRoll";
import TransitionRoll from "../transition/TransitionRoll";
import TransitionTranslateRoll from "../transition/TransitionTranslateRoll";
export default class RollFactory {
    private mode: number
    constructor(mode: number) {
        this.mode = mode;
    }

    isTransitionTranslate(): boolean {
        return this.mode === 1
    }

    isTransitionDefault(): boolean {
        return this.mode === 2
    }

    isAnimationTranslate(): boolean {
        return this.mode === 3
    }

    isAnimationDefault(): boolean {
        return this.mode === 4
    }

    strategy(el: HTMLElement, scope: Scope, easing: Factory, isComponsition: boolean): RollDigitalizer {
        if (this.isAnimationDefault()) {
            return new AnimationRoll(el, scope, easing.algorithm);
        } else if (this.isAnimationTranslate()) {
            return new AnimationTranslateRoll(el, scope, easing.algorithm, isComponsition);
        } else if (this.isTransitionDefault()) {
            return new TransitionRoll(el, scope, easing.style())
        } else (this.isTransitionTranslate()) {
            return new TransitionTranslateRoll(el, scope, easing.style(), isComponsition)
        }
    }
}