import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../../translate/RollProxy";
import Event from "../utils/EventKit";

export default class RollMove implements EventDigitalizer {
    constructor() { }

    private isIarge(first: number, second: number): boolean {
        return first > second
    }

    private isPlenty(now: number, start: number): boolean {
        return now - start > 300
    }
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void {
        if (proxy.disabled) { return; }
        let point = Event.isTouchEvent(e) ? e.touches[0] : e,
            deltaX = point.pageX - attrs.getPointX(),
            deltaY = point.pageY - attrs.getPointY(),
            pos = proxy.getPosition(),
            maxScroll = proxy.getMaxScroll(),
            timestamp = Date.now(),
            newX, newY,
            absDistX, absDistY;

        attrs.setPoint(point.pageX, point.pageY);
        attrs.setDelta(attrs.getDeltaX() + deltaX, attrs.getDeltaY() + deltaY);
        absDistX = Math.abs(attrs.getDeltaX());
        absDistY = Math.abs(attrs.getDeltaY());

        if (this.isPlenty(timestamp, attrs.getEndTime()) && (this.isIarge(10, absDistX) && this.isIarge(10, absDistY))) { return; }

        if (attrs.isNoLocked() && !proxy.isFreeScroll()) {
            if (absDistX > absDistY + proxy.getDirectionLockThreshold()) {
                attrs.setMode(1)
            } else if (absDistY >= absDistX + proxy.getDirectionLockThreshold()) {
                attrs.setMode(2)
            } else {
                attrs.setMode(0)
            }
        }

        if (attrs.isAxisXLocked()) {
            if (proxy.isVPassthrough()) {
                e.preventDefault()
            }
            if (proxy.isHPassthrough()) {
                attrs.setState(0);
                return;
            }
            deltaY = 0
        }
        if (attrs.isAxisYLocked()) {
            if (proxy.isHPassthrough()) {
                e.preventDefault()
            }
            if (proxy.isVPassthrough()) {
                attrs.setState(0);
                return;
            }
            deltaX = 0
        }

        deltaX = proxy.isHScroll() ? deltaX : 0
        deltaY = proxy.isVScroll() ? deltaY : 0

        newX = pos.x + deltaX;
        newY = pos.y + deltaY;

        if (this.isIarge(newX, 0) || this.isIarge(maxScroll.x, newX)) {
            newX = proxy.isResilient() ? pos.x + deltaX / 3 : (this.isIarge(newX, 0) ? 0 : maxScroll.x)
        }

        if (this.isIarge(newY, 0) || this.isIarge(maxScroll.y, newY)) {
            newY = proxy.isResilient() ? pos.y + deltaY / 3 : (this.isIarge(newY, 0) ? 0 : maxScroll.y)
        }


        if (attrs.getState() !== 2) {
            proxy.trigger('scroll:start', pos)
        }

        attrs.setState(2);

        proxy.translate(newX, newY);

        if (this.isPlenty(timestamp, attrs.getStartTime())) {
            attrs.setStartTime(timestamp)
            attrs.setStart(pos.x, pos.y)
        }
    }
}