import { ClassicEvent, Notifier } from "typings/@niyang-es/notify"

export * from "./roll.d.ts"

interface Notify{
   new():Notify
   on(name: string, fn: ScrollKit.NotifyCallback<ClassicEvent>): void 
   off(name: string, fn?: ScrollKit.NotifyCallback<ClassicEvent>): void
    trigger(e: string | ClassicEvent, ...args: Array<ScrollKit.NotifyParams>): void
}

interface Scope{
     readonly rootElement: HTMLElement;
     new (el: HTMLElement):Scope
     setContentSpecifiedIndex(specifiedIndex: number): void 
     getProbe(): number 
     setProbe(probe: number): void 
     setScrollX(x: number): void 
     setScrollY(y: number): void 
     setScrollZ(z: number): void 
     setScrollMode(mode: number): void 
     setScrollPreventState(state: number): void 
     setScrollDirection(x: number, y: number): void 
     setBounce(bounce: boolean): void 
     setBounceTime(time: number): void 
     getPosition(): ScrollKit.Point 
     setPosition(x: number, y: number): void 
     isLockScrollX(): boolean
     isLockScrollY(): boolean 
     isNoLocked():boolean
     isScrollX(): boolean
     isScrollY():boolean
     isFreeScroll(): boolean 
     isXPrevent(): boolean
     isYPrevent(): boolean 
     isNoPrevent(): boolean
     isBounce(): boolean 
     getBounceTime(): number 
     isHScroll(): boolean 
     isVScroll(): boolean 
     getWrapElement(): HTMLElement 
     getScrollElement(): HTMLElement 
     getCrisisPosition(): ScrollKit.Point
     getMaxDistance(): ScrollKit.Point
     getDirectionLockThreshold(): number 
     setDirectionLockThreshold(threshold: number): void 
     getMomentumThreshold(): number 
     setMomentumThreshold(dist: number): void 
     getMomentumPeroid(): number 
     setMomentumPeroid(time: number): void 
     setMomentum(flag: boolean):void
     shouldMomentum(): boolean 
     setDeceleration(deceleration: number): void 
     getDeceleration(): number
     setTapable(tapable: boolean): void 
     isTapable(): boolean
     setClickable(clickable: boolean)
     isClickable(): boolean 
     getComputedMomontum(start: number, duration: number, pos: number, isVertical: boolean): ScrollKit.Momentum
     setMouseWheelSpeed(speed: number): void 
     setMouseWheelDirection(dir: number): void 
     getMouseWheelSpeed(): number 
     getMouseWheelDirection(): number
 
}
interface Digitalizer { 
    getScope():Scope;
    scrollTo(x: number, y: number, time: number, easing?: string | ScrollKit.Algorithm): void;
    translate(x: number, y: number): void;
    getState(): number;
    setState(state: number): void;
    getPosition(): ScrollKit.Point;
    getComputedPosition(): ScrollKit.Point;
    getAnimation(): string | ScrollKit.Algorithm;
    stop(): void;
    resetPosition(): void
}

interface IFactory<T>{
  setUseTransition(useTransition: boolean): void
  setUseTransform(useTransform: boolean):void
  setHWCompositing(HWCompositing: boolean):void
   build(scope:Scope,notify:Notify):T;
}

interface RollProxy extends IFactory<void>,Digitalizer{}

interface Context{
    new(proxy: RollProxy):Context
    setStart(x: number, y: number) 
    getStartX(): number 
    getStartY(): number 
    setState(state: number) 
    getState(): number 
    execute(e: Event, cmd: string) 
    destroy()
}


declare interface IRoll {
    new(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.Options):IRoll
    scrollTo(x: number, y: number, time: number, ease: string | ScrollKit.Algorithm);
    translate(x:number,y:number):void
    destory():void
    on(name:string,fn:ScrollKit.NotifyCallback<ClassicEvent>):void
    off(name:string,fn:ScrollKit.NotifyCallback<ClassicEvent>):void
}
