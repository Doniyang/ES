declare namespace RollKit {
    export type Selector = string | HTMLElement
    export type NotifyParams = number | string | boolean | object
    export type OffsetOption = number | boolean

    export interface Exception {
        [key: string]: RegExp
        tagName: RegExp
        className: RegExp
    }

    export interface MouseeWheelOption {
        enabled: boolean
        speed: number
        invert: boolean
        time: number
    }

    export interface BounceOption {
        enabled: boolean
        time: number
    }

    export interface MomentumOption {
        enabled: boolean
        time: number
        distance: number
        deceleration: number
    }

    export interface PreventFilter {
        enabled: boolean
        regular: Partial<Exception>
    }

    export interface Options {
        [key: string]: any,
        startX?: number
        startY?: number
        scrollX?: boolean
        scrollY?: boolean
        eventPassthrough?: string
        clickable?: boolean
        tap?: boolean
        bounce?: boolean | Partial<BounceOption>
        directionLockThreshold?: number
        resizePolling?: number
        mouseeWheel?: boolean | Partial<MouseeWheelOption>
        momentum?: boolean | Partial<MomentumOption>
        deceleration?: number
        probe?: number
        specifiedIndex?: number
        stopPropagation?: boolean
        prevent?: boolean | PreventFilter
        HWCompositing?: boolean
        useTransition?: boolean
        useTransform?: boolean
        bindToWrapper?: boolean
    }


    export interface Point {
        x: number
        y: number
    }

    export interface Momentum {
        destination: number
        duration: number
    }

    export interface CustomEvent extends Event {
        pageX?: number
        pageY?: number
    }

    export interface RollCustomEvent extends Event {
        view?: any
        detail?: number;
        screenX?: number;
        screenY?: number;
        clientX?: number;
        clientY?: number;
        ctrlKey?: boolean;
        altKey?: boolean;
        shiftKey?: boolean;
        metaKey?: boolean;
        button?: number;
        relatedTarget?: any;
        _constructed?: boolean;
    }

    export interface ElementEventTarget extends EventTarget {
        tagName?: string
        screenX?: number
        screenY?: number
        clientX?: number
        clientY?: number
    }

    export interface Animation {
        style(): string
        algorithm(k: number): number
    }

    export interface AnimationOptions {
        startX: number
        startY: number
        duration: number
        startTime: number
        destTime: number
        destX: number
        destY: number
        ease: Animation
    }

    export interface NotifyCallback<T> {
        (evt: T, ...args: Array<NotifyParams>): void
    }

    export interface EventListener {
        (el: HTMLElement | window, type: string, fn: any, capture?: any): void;
    }

    export interface Motion {
        (x: number, y: number): void
    }

    export interface FilterCallback<T> {
        (arg: T): boolean
    }
}