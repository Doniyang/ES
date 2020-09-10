import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../RollProxy";

export default class RollMove implements EventDigitalizer {
    private preventDefault: boolean
    private isRollFree: boolean;
    private threshold: number;
    private passthrough: number;
    constructor() {
        this.preventDefault = false
        this.isRollFree = false
        this.threshold = 200
        this.passthrough = 0
    }

    private isTouchEvent(e: Event): e is TouchEvent {
        return 'touches' in e
    }

    private isPreventDefault() {
        return this.preventDefault
    }
    private isInplant(dist: number): boolean {
        return dist < 10
    }

    private isPlenty(now: number, start: number): boolean {
        return now - start > 300
    }

    private isAxisXPassthrough(): boolean {
        return this.passthrough === 1
    }

    private isAxisYPassthrough(): boolean {
        return this.passthrough === 2
    }

    private isAxisLocked(): boolean {
        return !this.isRollFree
    }

    setPreventDefault(preventDefault: boolean) {
        this.preventDefault = preventDefault
    }
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void {
        if (proxy.disabled) { return; }
        if (this.isPreventDefault()) {
            e.preventDefault()
        }
        let point = this.isTouchEvent(e) ? e.touches[0] : e,
            deltaX = point.pageX - attrs.getPointX(),
            deltaY = point.pageY - attrs.getPointY(),
            timestamp = Date.now(),
            newX, newY,
            absDistX, absDistY;

        attrs.setPoint(point.pageX, point.pageY);
        attrs.setDelta(attrs.getDeltaX() + deltaX, attrs.getDeltaY() + deltaY);
        absDistX = Math.abs(attrs.getDeltaX());
        absDistY = Math.abs(attrs.getDeltaY());

        if (this.isPlenty(timestamp, attrs.getEndTime()) && (this.isInplant(absDistX) && this.isInplant(absDistY))) { return; }

        if (attrs.isNoLock() && this.isAxisLocked()) {
            if (absDistX > absDistY + this.threshold) {
                attrs.setLock(1)
            } else if (absDistY >= absDistX + this.threshold) {
                attrs.setLock(2)
            } else {
                attrs.setLock(0)
            }
        }

        if(attrs.isAxisXLocked()){
            if(this.isAxisYPassthrough()){ e.preventDefault()}
            if(this.isAxisXPassthrough()){
                attrs.setState(0)
                return;
            }
            deltaY = 0
        }

        if(attrs.isAxisYLocked()){
            if(this.isAxisXPassthrough()){ e.preventDefault()}
            if(this.isAxisYPassthrough()){
                attrs.setState(0)
                return;
            }
            deltaX = 0
        }

    }
    attainState(state: number): boolean {
        return state === 1
    }

}