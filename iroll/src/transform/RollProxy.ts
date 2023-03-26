import Scope from "src/scope/Scope";
import Notify from "../notify/Notify";
import Digitalizer from "./animate/Digitalizer";
import Factory from "./Factory";
import IFactory from "./IFactory";

export default class RollProxy  implements Digitalizer,IFactory<void> {

  private roll: Digitalizer | null

  private notify: Notify

  private factory: Factory
  constructor(notify: Notify) {
    this.roll = null
    this.notify = notify
    this.factory = new Factory()
  }

  get disabled():boolean{
    return this.roll === null
  }

  trigger(name:string,...args:Array<ScrollKit.NotifyParams>){
    this.notify.trigger(name,...args)
  }

  setUseTransition(useTransition: boolean): void {
    this.factory.setUseTransition(useTransition);
  }
  setUseTransform(useTransform: boolean): void {
    this.factory.setUseTransform(useTransform);
  }
  setHWCompositing(HWCompositing: boolean): void {
    this.factory.setHWCompositing(HWCompositing)
  }
  build(scope: Scope): void {
    this.roll = this.factory.build(scope, this.notify)
  }
  getScope(): Scope {
    return (this.roll as Digitalizer).getScope()
  }

  scrollTo(x: number, y: number, time: number, easing?: string | ScrollKit.Algorithm | undefined): void {
    this.roll?.scrollTo(x, y, time, easing)
  }
  translate(x: number, y: number): void {
    this.roll?.translate(x, y);
  }
  getState(): number {
    return (this.roll as Digitalizer).getState();
  }
  setState(state: number): void {
    this.roll?.setState(state);
  }
  getPosition(): ScrollKit.Point {
    return (this.roll as Digitalizer).getPosition();
  }
  getComputedPosition(): ScrollKit.Point {
    return (this.roll as Digitalizer).getComputedPosition();
  }
  getAnimation(): string | ScrollKit.Algorithm {
    return (this.roll as Digitalizer).getAnimation();
  }
  stop(): void {
    this.roll?.stop();
  }
  resetPosition(): void {
    this.roll?.resetPosition();
  }
}