/**
 * 该类使用动画实现滚动效果
 */
import Digitalizer from "./Digitalizer";
import Animation from "./Animation";
import Scope from "./Scope";

export default class AnimationDefaultRoll extends Animation implements Digitalizer{
   private scope:Scope;
   private bounceTime:number;

   constructor(el:HTMLElement,scope:Scope,time:number) {
       super(el);
       this.scope = scope;
       this.bounceTime = time 
   }


    translate(x: number, y: number): void {
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
        this.scope.setAxisX(x);
        this.scope.setAxisY(y);
    }
    scrollTo(x: number, y: number, time: number): void {
        
       this.animate(function(tm){

       }) 
    }
    
}