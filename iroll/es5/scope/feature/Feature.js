import Axis from "src/axis/Axis";
/**
 * @class Feature
 * @author niyang
 */
export default class Feature {
    /**
     * @constructor
     */
    constructor() {
        this.mode = 2;
        this.direction = new Axis();
        this.prevent = 0;
        this.automatic = false;
        this.threshold = 5;
        this.roll = new Axis();
    }
    setScrollX(x) {
        this.roll.setAxisX(x);
    }
    getScrollX() {
        return this.roll.getAxisX();
    }
    setScrollY(y) {
        this.roll.setAxisY(y);
    }
    getScrollY() {
        return this.roll.getAxisY();
    }
    setScrollZ(x) {
        this.roll.setAxisZ(x);
    }
    getScrollZ() {
        return this.roll.getAxisZ();
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    setDirection(x, y) {
        this.direction.setAxisX(x);
        this.direction.setAxisY(y);
    }
    getDirectionX() {
        return this.direction.getAxisX();
    }
    getDirectionY() {
        return this.direction.getAxisY();
    }
    setPrevent(prevent) {
        this.prevent = prevent;
    }
    getPrevent() {
        return this.prevent;
    }
    getThreshold() {
        return this.threshold;
    }
    setThreshold(threshold) {
        this.threshold = threshold;
    }
}
