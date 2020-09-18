import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../RollProxy";
import Event from "../utils/EventKit";

export default class RollStart implements EventDigitalizer {
  constructor() { }
  
  execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void {
    let point = Event.isTouchEvent(e) ? e.touches[0] : e, pos;

    attrs.setDelta(0, 0);
    attrs.setDirection(0, 0);
    attrs.setMode(0);
    attrs.setStartTime(Date.now());

    proxy.stop();

    pos = proxy.getPosition();

    attrs.setStart(pos.x, pos.y);
    attrs.setAbsStart(pos.x, pos.y);
    attrs.setPoint(point.pageX, point.pageY);
    attrs.setState(1);
    proxy.trigger('scroll:bofore', pos);

  }

  attainState(state: number): boolean {
    return state === 0
  }
}