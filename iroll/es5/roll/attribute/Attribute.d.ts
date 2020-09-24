/**
 * 定义IRoll插件的一些属性
 *  author niyang
 */
export default class Attribute {
    /**
     * 开始点
     */
    private start;
    /**
     * 绝对开始的
     */
    private absStart;
    /**
     * 移动点
     */
    private delta;
    /**
     * 位移点
     */
    private direction;
    /**
     * 用来记录手指接触屏幕的点或者鼠标滚动开始的点
     */
    private point;
    /**
     * 开始时间，单位毫秒
     */
    private starttime;
    /**
     * 结束时间 单位ms
     */
    private endtime;
    /**
     * 状态
     */
    private state;
    /**
     * 锁定方向
     * 0 --- 未锁定
     * 1 --- 锁定X
     * 2 --- 锁定Y
     */
    private mode;
    constructor();
    getStartX(): number;
    getStartY(): number;
    getAbsStartX(): number;
    getAbsStartY(): number;
    getDeltaX(): number;
    getDeltaY(): number;
    getDirectionX(): number;
    getDirectionY(): number;
    getPointX(): number;
    getPointY(): number;
    getStartTime(): number;
    getEndTime(): number;
    getState(): number;
    isNoLocked(): boolean;
    isAxisXLocked(): boolean;
    isAxisYLocked(): boolean;
    setStart(x: number, y: number): void;
    setAbsStart(x: number, y: number): void;
    setDelta(x: number, y: number): void;
    setDirection(x: number, y: number): void;
    setPoint(x: number, y: number): void;
    setStartTime(starttime: number): void;
    setEndTime(endtime: number): void;
    setState(state: number): void;
    setMode(mode: number): void;
}
