/**
 * 该类使用动画实现滚动效果
 */
import RollDigitalizer from "../RollDigitalizer";
import Animation from "./Animation";
import Scope from "../scope/Scope";

export default class AnimationRoll implements RollDigitalizer {
    private scope: Scope;
    private raftime: number;
    private algorithm: AnimationKit.Algorithm;
    private animation:Animation;
    constructor(el: HTMLElement, scope: Scope,algorithm:AnimationKit.Algorithm) {
        this.animation =new Animation(el);
        this.scope = scope;
        this.raftime = 0;
        this.algorithm = algorithm
    }
    stop(): void {
        this.setState(0);
        this.animation.cleanRafId()
    }
    getPosition(): ScrollKit.Point {
        return this.scope.position();
     }
    getComputedPosition(): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(this.animation.getScrollElement(), null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y } ;
    }
    getState(): number {
      return this.animation.getState();
    }
    setState(state: number): void {
        this.animation.setState(state);
    }

    private isInAnimation() {
        return this.animation.getState() === 2
    }

    private isTimeOut(now:number,duration:number){
        return now >= duration
    }

    private animationFrame(start: ScrollKit.Point, dest: ScrollKit.Point, duration: number, startTime: number) {
        let destTime = startTime + duration,now = Date.now(), newX, newY, easing;
        const that = this    

        if ( this.isTimeOut(now,destTime)) {
            this.translate(dest.x, dest.y);
            this.animation.cleanRafId();
            this.raftime = 0
            return;
        }

        now = (now - startTime) / duration;
        easing = this.algorithm(now);
        newX = (dest.x - start.x) * easing + start.x;
        newY = (dest.y - start.y) * easing + start.y;
        this.translate(newX, newY);

        if (this.isInAnimation()) {
            this.animation.animate(function (tm) {
                that.raftime = tm
                that.animationFrame(start, dest, duration, startTime);
            })
        }
    }

    translate(x: number, y: number): void {
        let scrollStyle: CSSStyleDeclaration = this.animation.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxis(x,y);
    }
    scrollTo(x: number, y: number, time: number): void {
        let now = Date.now();
        let position = this.scope.position();
        const that = this;

        this.animation.animate(function (tm) {
            that.raftime = tm
            that.animationFrame(position, { x, y }, time, now);
        })
    }
}