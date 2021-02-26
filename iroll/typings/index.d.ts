import { ClassicEvent, Notifier } from 'typings/@niyang-es/notify';
import { LinkedQueue } from "typings/@niyang-es/toolkit";

export * from './roll'

declare class Scope {
    new(el: HTMLElement): Scope;
    readonly rootElement: HTMLElement;
    private deceleration: number;
    private passthrough: number;
    private threshold: number;
    private time: number;
    private bounce: boolean;
    private momentum: boolean;
    private axis: Axis;
    private scroll: Axis;
    private clickable: boolean;
    private tap: boolean;
    private HWCompositing: boolean
}

declare class Notify {
    private notify: Notifier;

    new(): Notify;

    public on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void;

    public off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void;

    public trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void;
}

declare class RollProxy {
    new(notify: Notify): RollProxy;
    scrollTo(x: number, y: number, time: number): void;
    translate(x: number, y: number): void;
    getState(): number;
    getPosition(): ScrollKit.Point;
    getComputedPosition(): ScrollKit.Point;
    setState(state: number): void;
    getAnimation(): string | ScrollKit.Algorithm;
    stop(): void;
    resetPosition(): void;
}

declare class Axis {
    private axisX: number;
    private axisY: number;
    private axisZ: number;
    new(): Axis
}

declare class Attribute {
    /**
    * 开始点
    */
    private start: Axis;
    /**
     * 绝对开始的
     */
    private absStart: Axis
    /**
     * 移动点
     */
    private delta: Axis;
    /**
     * 位移点
     */
    private direction: Axis;
    /**
     * 用来记录手指接触屏幕的点或者鼠标滚动开始的点
     */
    private point: Axis;
    /**
     * 开始时间，单位毫秒
     */
    private starttime: number;
    /**
     * 结束时间 单位ms
     */
    private endtime: number
    /**
     * 状态
     */
    private state: number
    /**
     * 锁定方向
     * 0 --- 未锁定
     * 1 --- 锁定X
     * 2 --- 锁定Y
     */
    private mode: number;
    new(): Attribute
}

declare interface EventDigitalizer {
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void
}
declare class Context {
    private attrs: Attribute;
    private facotry: RollFactory;
    private proxy: RollProxy;
    new(proxy: RollProxy): Context;

    setStart(x: number, y: number): void

    getStartX(): number

    getStartY(): number

    setState(state: number): void

    getState(): number

    execute(e: Event, cmd: string): void

    destroy(): void

}

export declare class IRoll {
    private scope: Scope;
    private rollProxy: RollProxy;
    private context: Context;
    private notify: Notify;
    private factory: RollFactory;
    private bindToWrapper: boolean
    private preventDefault: boolean
    private preventDefaultException: ScrollKit.Exception
    private resizePolling: number
    private stopPropagation: boolean
    private mouseWheel: boolean
    private resizeTimeoutId: number
    new(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.scrollOptions): IRoll
    scrollTo(x: number, y: number, time: number, ease: string | ScrollKit.Algorithm): void
}