declare type argsOption = number | string | boolean | object
declare type targetOption = null | object
declare interface Callbackable<T> {
  (evt:T,...args:Array<argsOption>):void
}

declare namespace iRoll {
  export type elwrap = string | HTMLElement
  export interface rollOptions {
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
    preventDefaultException?: object
    HWCompositing?: boolean
    useTransition?: boolean
    useTransform?: boolean
    bindToWrapper?: boolean
    disableMouse?: boolean
    disableTouch?: boolean
  }
  export interface Point {
    x?: number
    y?: number
    directionX?:number
    directionY?:number
    maxX?:number
    maxY?:number
  }
  export interface Prefix {
    [key: string]: string
  }
  export interface Category {
    [key: string]: number
  }

  export interface Anmation {
    style: string,
    fn: (k: number) => number
  }

  export interface Offset{
    height?:number
    width?:number
    top?:number
    left?:number
  }

}