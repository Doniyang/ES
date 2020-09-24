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
     * 绝对开始的
     */
    private absStart:Axis
    /**
     * 移动点
     */
    private delta: Axis;
    /**
     * 位移点
     */
    private direction: Axis;
    /**
     * 用来记录手指接触屏幕的点或者鼠标滚动开始的点
     */ 
    private point:Axis;
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
     * 锁定方向
     * 0 --- 未锁定
     * 1 --- 锁定X
     * 2 --- 锁定Y
     */
    private mode:number

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

    getStartX(): number {
        return this.start.getAxisX();
    }

    getStartY(): number {
        return this.start.getAxisY();
    }
     
    getAbsStartX(): number {
        return this.absStart.getAxisX();
    }

    getAbsStartY(): number {
        return this.absStart.getAxisY();
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

    getPointX(): number {
        return this.point.getAxisX();
    }

    getPointY(): number {
        return this.point.getAxisY();
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

    isNoLocked():boolean{
        return this.mode === 0
    }

    isAxisXLocked():boolean{
     return this.mode ===1 
    }

    isAxisYLocked():boolean{
        return this.mode === 2
    }

    setStart(x: number, y: number):void {
        this.start.setAxisX(x)
        this.start.setAxisY(y)
    }

    setAbsStart(x:number,y:number):void{
        this.absStart.setAxisX(x);
        this.absStart.setAxisY(y);
    }

    setDelta(x: number, y: number): void {
        this.delta.setAxisX(x)
        this.delta.setAxisY(y)
    }

    setDirection(x: number, y: number): void {
        this.direction.setAxisX(x)
        this.direction.setAxisY(y)
    }

    setPoint(x:number,y:number){
        this.point.setAxisX(x);
        this.point.setAxisY(y);
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
    
    setMode(mode:number):void{
        this.mode = mode
    }
}