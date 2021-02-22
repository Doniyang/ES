declare namespace ScrollKit {
    export type ElementWrapper = string | HTMLElement
    export type NotifyParams = number | string | boolean | object

    export interface Exception {
        [key: string]: any
        tagName?: RegExp
        className?: RegExp
    }

    export interface WheelParams {
        speed?: number
        invert?: boolean
        enable?: boolean
    }

    export interface scrollOptions {
        startX?: number
        startY?: number
        scrollX?: boolean
        scrollY?: boolean
        freeScroll?: boolean
        eventPassthrough?: number
        clickable?: boolean
        tap?: boolean
        bounce?: boolean
        momentum?: boolean
        probe?: number
        wheel?: WheelParams,
        preventDefault?: boolean
        preventDefaultFilter?: ElementFilter
        HWCompositing?: boolean
        useTransition?: boolean
        useTransform?: boolean
        bindToWrapper?: boolean
    }
    export interface Point {
        x: number
        y: number
    }

    export interface Momentun {
        destination: number
        duration: number
    }

    export interface Cache<T> {
        [key: string]: T
    }

    export interface VisitorCallback<T> {
        (arg: T): void
    }

    export interface CustomEvent extends Event {
        pageX?: number
        pageY?: number
    }

    export interface ElementEventTarget extends EventTarget {
        tagName?: string
        screenX?: number
        screenY?: number
        clientX?: number
        clientY?: number
    }
    export interface Algorithm {
        (k: number): number
    }

    export interface NotifyCallback<T> {
        (evt: T, ...args: Array<NotifyParams>): void
    }
}