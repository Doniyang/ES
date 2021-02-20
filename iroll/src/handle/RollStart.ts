import Scope from "src/scope/Scope";
import DateKit from "src/utils/DateKit";
import EventKit from "src/utils/EventKit";
import Attribute from "../attribute/Attribute";
import RollProxy from "../translate/RollProxy";
import Digitalizer from "./Digitalizer";

export default class RollStart implements Digitalizer {
    constructor() { }
    attain(state: number): boolean {
        return state === 0
    }
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void {
        let point = EventKit.isTouchEvent(e) ? e.touches[0] : e,
            pos: ScrollKit.Point = proxy.getPosition(),
            scope: Scope = proxy.getScope();

        if (proxy.disabled) { return void 0; }
        
        scope.setScrollMode(0);
        scope.setScrollDirection(0, 0);
        
        attrs.setDelta(0, 0);
        attrs.setStartTime(DateKit.getTime());

        if (proxy.getState() === 1) { proxy.stop(); }

        attrs.setOrigin(pos.x, pos.y);
        attrs.setPoint(point.pageX, point.pageY);
        attrs.setState(1);
        proxy.trigger('scroll:bofore', pos);
    }

}