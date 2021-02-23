import Attribute from "../attribute/Attribute";
import Scope from "../scope/Scope";
import { DateKit } from "../shared";
import RollProxy from "../translate/RollProxy";
import Digitalizer from "./Digitalizer";

export default class RollStop implements Digitalizer{

   private isOutBoundary(prev:ScrollKit.Point,next:ScrollKit.Point){
      return !(prev.x===next.x && prev.y===next.y)  
   }
    attain(state: number): boolean {
        return state ===2;
    }
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
        let pos:ScrollKit.Point = proxy.getPosition(),
        scope:Scope = proxy.getScope(),
        duration = DateKit.getTime() - attrs.getStartTime(),
        newX = Math.round(pos.x),
        newY = Math.round(pos.y),
        time = 0,
        easing,
        momentumX,
        momentumY;
  
      attrs.setEndTime(Date.now())
  
      if (this.isOutBoundary(pos,scope.getCrisisPosition())) {
        proxy.resetPosition();
        return void 0;
      }
  
      proxy.scrollTo(newX, newY, 0,proxy.getAnimation());
  
      if (attrs.getState() != 2) {
        if (proxy.isTapable()) {
          EventKit.tap(e, 'tap')
        }
        if (proxy.isClickable()) {
          EventKit.click(e, 'click')
        }
        proxy.trigger('scroll:cancel', pos)
        return
      }
  
      if (proxy.isOnRush() && this.isLarge(300, duration)) {
        momentumX = proxy.isHScroll() ? this.momentum(pos.x, attrs.getStartX(), duration, proxy.getMaxScroll().x, proxy.isResilient() ? proxy.getSize().x : 0, proxy.getDeceleration()) : { destination: newX, duration: 0 };
        momentumY = proxy.isVScroll() ? this.momentum(pos.y, attrs.getStartY(), duration, proxy.getMaxScroll().y, proxy.isResilient() ? proxy.getSize().y : 0, proxy.getDeceleration()) : { destination: newY, duration: 0 }
        newX = momentumX.destination;
        newY = momentumY.destination;
        time = Math.max(momentumX.duration, momentumY.duration);
        proxy.setState(1)
      }
  
      if (this.isunven(newX, pos.x) || this.isunven(newY, pos.y)) {
        if (this.isLarge(newX, 0) || this.isLarge(proxy.getMaxScroll().x, newX) || this.isLarge(newY, 0) || this.isLarge(proxy.getMaxScroll().y, newY)) {
          easing = new Quadratic();
          proxy.isTransition() ? proxy.setAnimation(easing.style()) : proxy.setAnimation(easing.algorithm)
        }
        proxy.scrollTo(newX, newY, time);
        return;
      }
      proxy.trigger('scroll:end', pos)
    }
    
}