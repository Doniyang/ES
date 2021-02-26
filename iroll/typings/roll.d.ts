declare namespace ScrollKit {
    export type ElementWrapper = string | HTMLElement
    export type NotifyParams = number | string | boolean | object

    export interface Exception {
        [key: string]: any
        tagName?: RegExp
        className?: RegExp
    }

    export interface Options {
        startX?: number
        startY?: number
        scrollX?: boolean
        scrollY?: boolean
        freeScroll?: boolean
        eventPassthrough?: number
        clickable?: boolean
        tap?: boolean
        bounce?: boolean
        bounceTime?:number
        directionLockThreshold?:number
        resizePolling?:number
        mouseWheel?:boolean
        mouseWheelSpeed?:number
        invertWheelDirection?:boolean
        momentum?: boolean
        momentumLimitTime?:number
        momentumLimitDistance?:number
        deceleration?:number
        probe?: number
        specifiedIndex?:number
        stopPropagation?:boolean
        preventDefault?: boolean
        preventDefaultException?: Exception
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