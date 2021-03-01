import { ClassicEvent, Notifier } from "typings/@niyang-es/notify"

export * from "./roll"

declare class Scope {
    new(el: HTMLElement): Scope
    readonly rootElement: HTMLElement
    private deceleration: number
    private passthrough: number
    private threshold: number
    private time: number
    private bounce: boolean
    private momentum: boolean
    private axis: Axis
    private scroll: Axis
    private clickable: boolean
    private tap: boolean
    private HWCompositing: boolean
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
