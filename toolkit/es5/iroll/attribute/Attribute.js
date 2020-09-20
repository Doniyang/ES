/**
 * 定义IRoll插件的一些属性
 *  author niyang
 */
import Axis from "../axis/Axis";
export default class Attribute {
    constructor() {
        this.start = new Axis();
        this.absStart = new Axis();
        this.delta = new Axis();
        this.direction = new Axis();
        this.point = new Axis();
        this.starttime = 0;
        this.endtime = 0;
        this.state = 0;
        this.mode = 0;
    }
    getStartX() {
        return this.start.getAxisX();
    }
    getStartY() {
        return this.start.getAxisY();
    }
    getAbsStartX() {
        return this.absStart.getAxisX();
    }
    getAbsStartY() {
        return this.absStart.getAxisY();
    }
    getDeltaX() {
        return this.delta.getAxisX();
    }
    getDeltaY() {
        return this.delta.getAxisY();
    }
    getDirectionX() {
        return this.direction.getAxisX();
    }
    getDirectionY() {
        return this.direction.getAxisY();
    }
    getPointX() {
        return this.point.getAxisX();
    }
    getPointY() {
        return this.point.getAxisY();
    }
    getStartTime() {
        return this.starttime;
    }
    getEndTime() {
        return this.endtime;
    }
    getState() {
        return this.state;
    }
    isNoLocked() {
        return this.mode === 0;
    }
    isAxisXLocked() {
        return this.mode === 1;
    }
    isAxisYLocked() {
        return this.mode === 2;
    }
    setStart(x, y) {
        this.start.setAxisX(x);
        this.start.setAxisY(y);
    }
    setAbsStart(x, y) {
        this.absStart.setAxisX(x);
        this.absStart.setAxisY(y);
    }
    setDelta(x, y) {
        this.delta.setAxisX(x);
        this.delta.setAxisY(y);
    }
    setDirection(x, y) {
        this.direction.setAxisX(x);
        this.direction.setAxisY(y);
    }
    setPoint(x, y) {
        this.point.setAxisX(x);
        this.point.setAxisY(y);
    }
    setStartTime(starttime) {
        this.starttime = starttime;
    }
    setEndTime(endtime) {
        this.endtime = endtime;
    }
    setState(state) {
        this.state = state;
    }
    setMode(mode) {
        this.mode = mode;
    }
}
