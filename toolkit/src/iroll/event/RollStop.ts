import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../RollProxy";
import EventKit from "../utils/EventKit";

export default class RollStop implements EventDigitalizer {
  private momentum(current: number, start: number, time: number, lowerMargin: number, wrapperSize: number, deceleration: number = 0.0006): ScrollKit.Momentun {
    let distance = current - start,
      speed = Math.abs(distance) / time,
      destination,
      duration;

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
      destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
      distance = Math.abs(destination - current);
      duration = distance / speed;
    } else if (destination > 0) {
      destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
      distance = Math.abs(current) + destination;
      duration = distance / speed;
    }

    return {
      destination: Math.round(destination),
      duration: duration
    };
  }

  private isLarge(a: number, b: number) {
    return a > b
  }

  execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void {
    let point = EventKit.isTouchEvent(e) ? e.changedTouches[0] : e,
      pos = proxy.getPosition(),
      duration = Date.now() - attrs.getStartTime(),
      newX = Math.round(pos.x),
      newY = Math.round(pos.y),
      distX = Math.abs(newX - attrs.getStartX()),
      distY = Math.abs(newY - attrs.getStartY()),
      time = 0,
      easing,
      momentX,
      momentY;

    attrs.setEndTime(Date.now())

    if (!proxy.isPeak()) {
      proxy.resetPosition();
      return
    }

    proxy.scrollTo(newX, newY, 0);

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

    if (proxy.isOnRush() && this.isLarge(300,duration)){
      momentX = proxy.isHScroll()?this.momentum(pos.x,attrs.getStartX(),duration,proxy.getMaxScroll().x,0.0006)
    } 




    }
  attainState(state: number): boolean {
    return state === 2;
  }


}