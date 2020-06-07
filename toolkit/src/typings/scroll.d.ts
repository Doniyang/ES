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
        preventDefaultException?: ElementFilter
        HWCompositing?: boolean
        useTransition?: boolean
        useTransform?: boolean
        bindToWrapper?: boolean
        disableMouse?: boolean
        disableTouch?: boolean
    }
    interface Point {
        x?: number
        y?: number
        directionX?: number
        directionY?: number
        maxX?: number
        maxY?: number
    }
    interface Prefix {
        [key: string]: string
    }
    interface Category {
        [key: string]: number
    }

    interface Anmation {
        style: string,
        fn: (k: number) => number
    }

    interface Offset {
        height?: number
        width?: number
        top?: number
        left?: number
    }
}