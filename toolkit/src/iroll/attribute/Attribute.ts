/**
 * 定义IRoll插件的一些属性
 *  author niyang
 */

import Axis from "../axis/Axis";

export default class Attribute {
    /**
     * 开始点
     */
    private start: Axis;
    /**
     * 移动点
     */
    private delta: Axis;
    /**
     * 位移点
     */
    private direction: Axis;
    /**
     *最小移动点  
     */
    private min: Axis;
    /**
     *最大移动点 
     */
    private max: Axis;

    /**
     * 开始时间，单位毫秒
     */
    private starttime: number;
    /**
     * 结束时间 单位ms
     */
    private endtime: number
    /**
     * 状态
     */
    private state: number
    /**
     * 滚动方式
     * 1--transition-trabslate 2--transition-default 3--animation-translate 4--animation-default 
     */
    private mode: number

    constructor() {
        this.start = new Axis();
        this.delta = new Axis();
        this.direction = new Axis();
        this.min = new Axis();
        this.max = new Axis();
        this.starttime = 0;
        this.endtime = 0;
        this.state = 0;
        this.mode = 0;
    }

    getStartX(): number {
        return this.start.getAxisX();
    }

    getStartY(): number {
        return this.start.getAxisY();
    }


    getDeltaX(): number {
        return this.delta.getAxisX()
    }

    getDeltaY(): number {
        return this.delta.getAxisY()
    }

    getDirectionX(): number {
        return this.direction.getAxisX();
    }

    getDirectionY(): number {
        return this.direction.getAxisY();
    }

    getMinX(): number {
        return this.min.getAxisX();
    }

    getMinY(): number {
        return this.min.getAxisY();
    }

    getMaxX(): number {
        return this.max.getAxisX();
    }

    getMaxY(): number {
        return this.max.getAxisY();
    }

    getStartTime(): number {
        return this.starttime
    }

    getEndTime(): number {
        return this.endtime;
    }

    getState(): number {
        return this.state
    }

    setStart(x: number, y: number) {
        this.start.setAxisX(x)
        this.start.setAxisY(y)
    }

    setDelta(x: number, y: number): void {
        this.delta.setAxisX(x)
        this.delta.setAxisY(y)
    }

    setDirection(x: number, y: number): void {
        this.direction.setAxisX(x)
        this.direction.setAxisY(y)
    }

    setMin(x: number, y: number) {
        this.min.setAxisX(x);
        this.min.setAxisY(y);
    }

    setMax(x: number, y: number) {
        this.max.setAxisX(x);
        this.max.setAxisY(y);
    }

    setStartTime(starttime: number): void {
        this.starttime = starttime
    }

    setEndTime(endtime: number): void {
        this.endtime = endtime;
    }

    setState(state: number): void {
        this.state = state;
    }
    getMode(): number {
        return this.mode
    }
    
    setMode(mode: number): void {
        this.mode = mode
    }

}