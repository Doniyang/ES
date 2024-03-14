export  default interface Digitalizer{
    scrollTo(x: number, y: number, time: number, easing?: RollKit.Animation): void;
    refresh():void;
    stop():void;
    destory():void;
}