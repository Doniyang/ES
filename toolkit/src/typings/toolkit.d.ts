type argsOption = null | number | string | boolean | object
type targetOptions = null | object
type fun = (...args: Array<argsOption>) => void
declare interface NotifierOptions {
  dataset?: argsOption
  fn: fun
}

declare interface MapSetOptions<T extends string> extends Set<string> { }

declare interface EventMapOptions<K extends string, MapSetOptions> extends Map<K, MapSetOptions> { }

declare namespace toolkit {
  export type targetOption = targetOptions
  export type mulitOption = argsOption
  export type fnOption = fun
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