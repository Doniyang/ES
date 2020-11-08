/**
 * 该类使用动画实现滚动效果
 */
import RollDigitalizer from "../RollDigitalizer";
import Scope from "../scope/Scope";
import Notify from "../notify/Notify";
export default class AnimationRoll implements RollDigitalizer {
    readonly mode: number;
    private scope;
    private raftime;
    private notify;
    private algorithm;
    private animation;
    constructor(scope: Scope, algorithm: ScrollKit.Algorithm, notify: Notify);
    private isInAnimation;
    private isTimeOut;
    private onFinish;
    private animationFrame;
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
    setAnimation(algorithm: ScrollKit.Algorithm): void;
    setState(state: number): void;
    translate(x: number, y: number): void;
    scrollTo(x: number, y: number, time: number): void;
}
