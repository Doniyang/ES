import { ClassicEvent, Notifier } from "typings/@niyang-es/notify"

export * from "./roll.d.ts"

declare class Feature {
    private mode: number;
    private roll: Axis;
    private direction: Axis;
    private prevent: number;
    private automatic: boolean
    private threshold: number
    new(): Feature
    setScrollX(x: number): void
    getScrollX(): number
    setScrollY(y: number): void
    getScrollY(): number
    setScrollZ(x: number): void
    getScrollZ(): number
    setMode(mode: number): void
    getMode(): number
    setDirection(x: number, y: number): void
    getDirectionX(): number
    getDirectionY(): number
    setPrevent(prevent: number): void
    getPrevent(): number
    getThreshold(): number
    setThreshold(threshold: number): void
}

declare class Momentum {
    private period: number;
    private threshold: number;
    private enable: boolean
    private deceleration: number
    new(): Momentum
    getPeriod(): number
    setPeriod(period: number): void
    getThreshold(): number
    setThreshold(threshold: number): void
    enabled(): boolean
    setEnableFlag(flag: boolean): void
    setDeceleration(deceleration: number): void
    getDeceleration(): number
    getComputedMomentum(current: number, start: number, time: number, margin: number, size: number): ScrollKit.Momentum
}

declare class Wheel {
    private speed: number
    private direction: number
    new(): Wheel
    getWheelSpeed(): number
    setWheelSpeed(speed: number): void
    setWheelDirection(direction: number): void
    getWheelDirection(): number
}
declare class Scope {
    new(el: HTMLElement): Scope
    readonly rootElement: HTMLElement;
    private axis: Axis;
    private feature: Feature;
    private specifiedIndex: number;
    private bounce: boolean;
    private bounceTime: number;
    private probe: number;
    private momentum: Momentum;
    private clickable: boolean
    private tapable: boolean
    private wheel: Wheel
    setContentSpecifiedIndex(specifiedIndex: number): void
    getProbe(): number
    setProbe(probe: number): void
    setScrollX(x: number): void
    setScrollY(y: number): void
    setScrollZ(z: number): void
    setScrollMode(mode: number): void
    setScrollPreventState(state: number): void
    setScrollDirection(x: number, y: number): void
    setBounce(bounce: boolean): void
    setBounceTime(time: number): void
    getPosition(): ScrollKit.Point
    setPosition(x: number, y: number): void
    isLockScrollX(): boolean
    isLockScrollY(): boolean
    isNoLocked()
    isScrollX(): boolean
    isScrollY()
    isFreeScroll(): boolean
    isXPrevent(): boolean
    isYPrevent(): boolean
    isNoPrevent(): boolean
    isBounce(): boolean
    getBounceTime(): number
    isHScroll(): boolean
    isVScroll(): boolean
    getWrapElement(): HTMLElement
    getScrollElement(): HTMLElement
    getCrisisPosition(): ScrollKit.Point
    getMaxDistance(): ScrollKit.Point
    getDirectionLockThreshold(): number
    setDirectionLockThreshold(threshold: number): void
    getMomentumThreshold(): number
    setMomentumThreshold(dist: number): void
    getMomentumPeroid(): number
    setMomentumPeroid(time: number): void
    setMomentum(flag: boolean)
    shouldMomentum(): boolean
    setDeceleration(deceleration: number): void
    getDeceleration(): number
    setTapable(tapable: boolean): void
    isTapable(): boolean
    setClickable(clickable: boolean)
    isClickable(): boolean
    getComputedMomontum(start: number, duration: number, pos: number, isVertical: boolean): ScrollKit.Momentun
    setMouseWheelSpeed(speed: number): void
    setMouseWheelDirection(dir: number): void
    getMouseWheelSpeed(): number
    getMouseWheelDirection(): number
}

declare class Notify {
    private notify: Notifier
    new(): Notify
    public on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void
    public off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void
    public trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void
}

declare class RollProxy {
    new(notify: Notify): RollProxy
    scrollTo(x: number, y: number, time: number): void
    translate(x: number, y: number): void
    getState(): number
    getPosition(): ScrollKit.Point
    getComputedPosition(): ScrollKit.Point
    setState(state: number): void
    getAnimation(): string | ScrollKit.Algorithm
    stop(): void
    resetPosition(): void
}

declare class Axis {
    private axisX: number
    private axisY: number
    private axisZ: number
    new(): Axis
}

declare class Attribute {
    private origin: Axis
    private destination: Axis
    private delta: Axis
    private state: number
    private startTime: number
    private endTime: number
    private point: Axis
    private absOrigin: Axis
    public getOriginX()
    public getOriginY(): number
    public setOrigin(x: number, y: number): void
    public getDestinationX(): number
    public getDestinationY(): number
    public setDestination(x: number, y: number): void
    public getDeltaX(): number
    public getDeltaY(): number
    public setDelta(x: number, y: number): void
    getState(): number
    setState(state: number): void
    getStartTime(): number
    setStartTime(time: number): void
    getEndTime(): number
    setEndTime(time: number): void
    getPointX(): number
    getPointY(): number
    setPoint(x: number, y: number): void
    getAbsOriginX(): number
    getAbsOriginY(): number
    setAbsOrigin(x: number, y: number): void
    new(): Attribute
}

declare interface Digitalizer {
    attain(state: number): boolean
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void
}

declare class RollFactory {
    private store: Map<string, Digitalizer>
    new(): RollFactory
    build(cmd: string): Digitalizer
    destroy()
}
declare class Context {
    private attrs: Attribute
    private facotry: RollFactory
    private proxy: RollProxy
    new(proxy: RollProxy): Context
    setStart(x: number, y: number): void
    getStartX(): number
    getStartY(): number
    setState(state: number): void
    getState(): number
    execute(e: Event, cmd: string): void
    destroy(): void
}

declare class Factory {
    private useTransition: boolean
    private useTransform: boolean
    private HWCompositing: boolean
    private notify: Notify
    new(notify: Notify): Factory
    setUseTransition(useTransition: boolean): void
    setUseTransform(useTransform: boolean)
    setHWCompositing(HWCompositing: boolean)
    build(scope: Scope): RollDigitalizer
}

export declare class Factory {
    private useTransition: boolean;
    private useTransform: boolean;
    private HWCompositing: boolean;
    private notify: Notify;
    new(notify: Notify): Factory
    setUseTransition(useTransition: boolean): void;
    setUseTransform(useTransform: boolean): void;
    setHWCompositing(HWCompositing: boolean): void;
    build(scope: Scope): RollDigitalizer;
}

export declare class IRoll {
    private scope: Scope
    private rollProxy: RollProxy
    private context: Context
    private notify: Notify
    private factory: Factory
    private bindToWrapper: boolean
    private preventDefault: boolean
    private preventDefaultException: ScrollKit.Exception
    private resizePolling: number
    private stopPropagation: boolean
    private mouseWheel: boolean
    private resizeTimeoutId: number
    new(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.Options): IRoll
    scrollTo(x: number, y: number, time: number, ease: string | ScrollKit.Algorithm): void
}
