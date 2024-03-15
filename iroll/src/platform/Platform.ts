import { ClassicEvent } from '@niyang-es/notify'
import { isNull } from "@niyang-es/toolkit"
import Transform from "../transform/Transform"
import Animation from "../animation/Animation"
import Transition from "../animation/Transition"
import Position from "../transform/Position"
import Notification from "../notification/Notification"
import { State } from '../shared'


export default class Platform {
   /**
    * @name scope
    */
   private readonly scope: Scope
   /**
    * @name transform
    */
   private transform: Transform | Position | null
   /**
    * @name animation
    */
   private animation: Animation | Transition | null
   /**
    * @name notify
    */
   private notify: Notification

   constructor(scope: Scope) {
      this.scope = scope
      this.transform = null
      this.animation = null
      this.notify = new Notification()
   }
   /**
    * @method isSupportTransform
    * @returns 
    */
   private isSupportTransform(): boolean {
      return this.scope.isSupportTransform()
   }
   /**
    * @method isSupportTransition
    * @returns 
    */
   private isSupportTransition(): boolean {
      return this.scope.isSupportTransition()
   }
   /**
    * @method buildTransform
    */
   private buildTransform() {
      this.transform = this.isSupportTransform() ? new Transform(this.scope) : new Position(this.scope)
   }
   /**
    * @method buildAnimation
    */
   private buildAnimation() {
      if (isNull(this.transform)) this.buildTransform()
      this.animation = this.isSupportTransition() ? new Transition(this.scope, this.transform as NonNullable<Transform | Position>, this.notify) : new Animation(this.scope, this.transform as NonNullable<Transform | Position>, this.notify)
   }
   /**
    * @method isNoChange
    * @param x 
    * @param y 
    * @returns 
    */
   private isNoChange(x: number, y: number) {
      const pos = this.scope.getZeta()
      return x === pos.x && y === pos.y
   }
   /**
    * @method on
    * @param name 
    * @param fn 
    */
   public on(name: string, fn: RollKit.NotifyCallback<ClassicEvent>) {
      this.notify.on(name, fn)
   }
   /**
  * @method off
  * @param name 
  * @param fn 
  */
   public off(name: string, fn?: RollKit.NotifyCallback<ClassicEvent>) {
      this.notify.off(name, fn)
   }

   /**
    * @method trigger
    * @param e 
    * @param args 
    */
   public trigger(e: string | ClassicEvent, ...args: Array<RollKit.NotifyParams>) {
      this.notify.trigger(e, ...args)
   }
   /**
    * @method translate
    * @param x 
    * @param y 
    */
   public translate(x: number, y: number) {
      if (isNull(this.transform)) this.buildTransform()
      this.transform?.translate(x, y)
   }

   /**
    * scrollTo
    */
   public scrollTo(x: number, y: number, time: number, ease?: RollKit.Animation) {
      if (this.isNoChange(x, y)) {
         this.scope.setState(State.None)
         return void 0
      }
      if (isNull(this.animation)) this.buildAnimation()
      this.animation?.scrollTo(x, y, time, ease)
   }

   /**
    * stop
    */
   public stop() {
      if (isNull(this.animation)) this.buildAnimation()
      this.animation?.stop()
   }

   /**
    * reset
    */
   public reset() {
      if (isNull(this.animation)) this.buildAnimation()
      this.animation?.refresh()
   }

   /**
    * destory
    */
   public destory() {
      this.animation?.destory()
      this.transform = null
      this.animation = null
      this.notify.destory()
   }
}