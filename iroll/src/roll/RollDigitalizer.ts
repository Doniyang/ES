export default interface RollDigitalizer {
    scrollTo(x: number, y: number, time: number): void;
    translate(x: number, y: number): void;
    getState(): number;
    getDirectionLockThreshold():number;
    getPosition():ScrollKit.Point;
    getComputedPosition():ScrollKit.Point;
    getMaxScroll():ScrollKit.Point;
    getSize():ScrollKit.Point;
    getDeceleration():number;
    setState(state: number): void;
    setAnimation(easing:string|ScrollKit.Algorithm):void;
    stop():void;
    resetPosition():void;
    isFreeScroll():boolean;
    isHScroll():boolean;
    isVScroll():boolean;
    isHPassthrough():boolean;
    isVPassthrough():boolean;
    isTransition():boolean;
    isResilient():boolean;
    isOnRush():boolean;
    isPeak():boolean;
    isClickable():boolean;
    isTapable():boolean;
}