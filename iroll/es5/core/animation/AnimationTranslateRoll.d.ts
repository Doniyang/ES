import RollDigitalizer from "../RollDigitalizer";
import Scope from "../scope/Scope";
import Notify from "../notify/Notify";
export default class AnimationTranslateRoll implements RollDigitalizer {
    readonly mode: number;
    private animation;
    private scope;
    private raftime;
    private algorithm;
    private notify;
    constructor(scope: Scope, algorithm: ScrollKit.Algorithm, notify: Notify);
    private isInAnimation;
    private isTimeOut;
    private onFinish;
    private animationFrame;
    private isRapid;
    private getScrollElement;
    private getScrollStyle;
    private getZonePosition;
    isFreeScroll(): boolean;
    isHScroll(): boolean;
    isVScroll(): boolean;
    isHPassthrough(): boolean;
    isVPassthrough(): boolean;
    isTransition(): boolean;
    isResilient(): boolean;
    isOnRush(): boolean;
    isPeak(): boolean;
    isClickable(): boolean;
    isTapable(): boolean;
    stop(): void;
    resetPosition(): void;
    getDirectionLockThreshold(): number;
    getPosition(): ScrollKit.Point;
    getSize(): ScrollKit.Point;
    getDeceleration(): number;
    getMaxScroll(): ScrollKit.Point;
    getComputedPosition(): ScrollKit.Point;
    getState(): number;
    setState(state: number): void;
    setAnimation(algorithm: ScrollKit.Algorithm): void;
    translate(x: number, y: number): void;
    scrollTo(x: number, y: number, time: number): void;
}