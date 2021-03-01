import { DateKit, EventKit } from '../shared';
/**
 * @class RollStart
 * @description roll start when touchstart or mousedown event dispatch
 */
export default class RollStart {
    constructor() {
        this.button = 0;
    }
    /**
     * @method updateMouseButton
     * @param e
     */
    updateMouseButton(e) {
        if (!e.which) {
            this.button = (e.button < 2) ? 0 : ((e.button == 4) ? 1 : 2);
        }
        else {
            this.button = e.button;
        }
    }
    /**
     * @method isValidButton
     * @description make sure that mouse event dispatch by left button
     */
    isValidButton() {
        return this.button === 0 /* Left */;
    }
    /**
     * @method attain
     * @param state
     * @description  make sure that cmd execute
     */
    attain(state) {
        return state === 0;
    }
    /**
     * @method execute
     * @param e
     * @param attrs
     * @param proxy
     */
    execute(e, attrs, proxy) {
        const point = EventKit.isTouchEvent(e) ? e.touches[0] : e, pos = proxy.getPosition(), scope = proxy.getScope();
        if (proxy.disabled) {
            return void 0;
        }
        if (!EventKit.isTouchEvent(e)) {
            this.updateMouseButton(e);
        }
        if (!this.isValidButton()) {
            return void 0;
        }
        scope.setScrollMode(0);
        scope.setScrollDirection(0, 0);
        attrs.setDestination(0, 0);
        attrs.setStartTime(DateKit.getTime());
        if (proxy.getState() === 1) {
            proxy.stop();
        }
        attrs.setOrigin(pos.x, pos.y);
        attrs.setAbsOrigin(pos.x, pos.y);
        attrs.setPoint(point.pageX, point.pageY);
        attrs.setState(1);
        proxy.trigger('scroll:bofore', pos);
    }
}
