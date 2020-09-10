declare namespace ScrollKit {
    type ElementWrapper = string | HTMLElement
    interface ElementFilter{
        (el:HTMLElement):boolean
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
        disableMouse?: boolean
        disableTouch?: boolean
    }
    interface Point {
        x: number
        y: number
    }
}