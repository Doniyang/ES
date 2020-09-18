declare namespace ScrollKit {
    type ElementWrapper = string | HTMLElement
    interface ElementFilter {
        (el: HTMLElement): boolean
    }
    interface scrollOptions {
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
        preventDefault?: boolean
        preventDefaultFilter?: ElementFilter
        HWCompositing?: boolean
        useTransition?: boolean
        useTransform?: boolean
        bindToWrapper?: boolean
    }
    interface Point {
        x: number
        y: number
    }

    interface Momentun {
        destination: number
        duration: number
    }

    interface Cache<T> {
        [key: string]: T
    }

    interface VisitorCallback<T>{
        (arg:T):void
    }

    interface CustomEvent extends Event{
        pageX?:number
        pageY?:number
    }

    interface ElementEventTarget extends EventTarget{
        tagName?:string
        screenX?:number
        screenY?:number
        clientX?:number
        clientY?:number
    }
}