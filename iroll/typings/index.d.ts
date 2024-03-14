declare class Scope {
    constructor(el: HTMLElement);
    merge(options: RollKit.Options): void;
    getRootElement(): HTMLElement;
    getRollElement(): HTMLElement;
    isHorizontalScroll(): boolean;
    isVerticalScroll(): boolean;
    getMaxScrollX(): number;
    getMaxScrollY(): number;
    setBeta(x: number, y: number): void;
    getBeta(): RollKit.Point;
    setDelta(x: number, y: number): void;
    getDelta(): RollKit.Point;
    setTheta(x: number, y: number): void;
    getTheta(): RollKit.Point;
    setEta(x: number, y: number): void;
    getEta(): RollKit.Point;
    setIota(x: number, y: number): void;
    getIota(): RollKit.Point;
    setKappa(x: number, y: number): void;
    getZeta(): RollKit.Point;
    setZeta(x: number, y: number): void;
    updateMode(absDeltaX: number, absDeltaY: number): void;
    setScrollStartTime(t: number): void;
    setScrollStopTime(t: number): void;
    setState(state: number): void;
    getState(): number;
    setMode(mode: number): void;
    setStatus(status: number): void;
    getStatus(): number;
    getResizePolling(): number;
    getMouseWheelSpeed(): number;
    getMouseWheelFactor(): number;
    getMouseWheelTime(): number;
    getProbeType(): number;
    getTaskTime(): number;
    getBounceTime():number;
    directionXCalc(duration: number, destination: number): RollKit.Momentum;
    directionYCalc(duration: number, destination: number): RollKit.Momentum;
    isSupportTransition(): boolean;
    isSupportTransform(): boolean;
    isSupportHardFast(): boolean;
    isSpuuort3D(): boolean;
    isFocusOnWrap(): boolean;
    isSupportWheel(): any;
    isSupportPrevent(): any;
    isLockScrollX(): boolean;
    isLockScrollY(): boolean;
    isPreventScrollX(): boolean;
    isPreventScrollY(): boolean;
    isStopPropagation(): boolean;
    isSupportBouce(): boolean;
    isSupportClick(): boolean;
    isSupportTap(): boolean;
    isSupportFlick(duration: number, absDistX: number, absDistY: number): boolean;
    isSupportMomentum(duration: number, absDistX: number, absDistY: number): boolean;
    isOutBoundary(): boolean;
    isInvalidSlip(timestamp: number, absThetaX: number, absThetaY: number): boolean;
    isValidSlip(timestamp: number): boolean;
    isSupportSnap(): boolean;
}

declare interface Transform {
    translate(x: number, y: number): void;
    getComputedPosition(): RollKit.Point;
    destory(): void
}

declare class Notify {
    constructor();
    on(name: string, fn: RollKit.NotifyCallback<any>): void;
    off(name: string, fn?: RollKit.NotifyCallback<any>): void;
    trigger(e: string | ClassicEvent, ...args: Array<RollKit.NotifyParams>): void;
}
declare class Platform {
    constructor(scope: Scope);

    translate(x: number, y: number): void;
    scrollTo(x: number, y: number, time: number, ease?: RollKit.Animation)
    on(name: string, fn: any): void
    off(name: string, fn?: any): void
    trigger(e: string, ...args: Array<any>): void
    stop(): void
    reset(): void
}

declare interface Digitalizer {
    attain(state: number): boolean;
    execute(e: Event, scope: Scope, platform: Platform): void
}


