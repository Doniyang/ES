import Axis from "../axis/Axis";
import { State, Lock, Status, ToolKit } from "../shared"
import Meta from "./Meta";

export default class Scope {
    /**
    * @description scroll wrap Element
    */
    readonly rootElement: HTMLElement;

    /**
     * @name beta
    * @type Axis
    * @description the orgin point
    */
    private beta: Axis;
    /**
     * @name delta
     * @type Axis
     * @description the offset from start to end
     */
    private delta: Axis;
    /**
    * @name theta
    * @type Axis
    * @description the abs offset from start to end
    */
    private theta: Axis;
    /**
     * @name zeta
     * @type Axis
     * @description the position of scroll
     */
    private zeta: Axis;
    /**
     * @name eta
     * @type Axis
     *  @description the last point of scroll
     */
    private eta: Axis
    /**
     * @name iota
     * @type Axis
     * @description the abs point of roll
     */
    private iota: Axis
    /**
     * @name kappa
     * @type Axis
     * @description the  direction of roll
     */
    private kappa: Axis
    /**
     * @type gamma
     * @description start time of roll
     */
    private gamma: number
    /**
     * @type sigma:number
     * @description end time of roll
     */
    private sigma: number
    /**
      * @type Number
      * @description the state for roll 
     * @example  
     *      0 is start
     *      1 is move
     *      2 is end
     *      3 is refresh
     */
    private state: number;
    /**
     * @type Number
     * @description the mode for roll
     * @example
     *    0 is free
     *    1 is left to right
     *    2 is top to bottom
     */
    private mode: number
    /**
     * @type number
     * @description the status when element scroll
     * @example
     *    0 is none
     *    1 is in transition
     *    2 is in anination
     */
    private status: number
    /**
     * meta of roll
     */
    private meta: Meta
    constructor(el: HTMLElement) {
        this.rootElement = el
        this.beta = new Axis()
        this.theta = new Axis()
        this.delta = new Axis()
        this.beta = new Axis()
        this.zeta = new Axis()
        this.eta = new Axis()
        this.iota = new Axis()
        this.kappa = new Axis()
        this.gamma = 0
        this.sigma = 0
        this.state = State.None
        this.mode = Lock.Auto
        this.status = Status.None
        this.meta = new Meta()
    }
    /**
     * @deprecated  
     * @default 1
     * @returns { Number }
     */
    private getSpecifiedIndex(): number {
        return this.meta.specifiedIndex || 0
    }

    private isNoLock() {
        return this.mode === Lock.Auto
    }

    /**
     * isAutoScroll
     */
    private isAutoScroll(): boolean {
        return this.meta.isAutoScroll()
    }

    /**
    * @method getClientWidth
    * @returns number
    */
    private getClientWidth(): number {
        return this.rootElement.clientWidth;
    }

    /**
     * @method getClientWidth
     * @returns number
     */
    private getClientHeight(): number {
        return this.rootElement.clientHeight;
    }

    /**
    * @method getScrollOffsetWidth
    * @description get offset width of scroll element
    * @returns number
    */
    private getScrollOffsetWidth(): number {
        return this.getRollElement().offsetWidth;
    }

    /**
     * @method getScrollOffsetHeight
     * @description get offset height of scroll element
     * @returns number
     */
    private getScrollOffsetHeight(): number {
        return this.getRollElement().offsetHeight;
    }
    /**
    * getScrollStopTime
    */
    private getScrollStopTime(): number {
        return this.sigma
    }
    /**
   * getScrollStartTime
   */
    private getScrollStartTime(): number {
        return this.gamma
    }
    /**
     * @param options 
     */
    public merge(options: RollKit.Options) {
        this.meta.chuck(options).ready((x:number,y:number)=>{
            this.setZeta(x,y)
        })
    }
    /**
     * @description get root element
     * @returns HTMLElement
     */
    public getRootElement(): HTMLElement {
        return this.rootElement
    }

    public getRollElement(): HTMLElement {
        return this.rootElement.children.item(this.getSpecifiedIndex()) as HTMLElement
    }

    /**
     * @method isHorizontalScroll
     */
    public isHorizontalScroll(): boolean {
        return this.meta.isHorizontalScroll() && ToolKit.isLessThan(this.getClientWidth(), this.getScrollOffsetWidth())
    }

    /**
    *  @method isVerticalScroll
    */
    public isVerticalScroll(): boolean {
        return this.meta.isVerticalScroll() && ToolKit.isLessThan(this.getClientHeight(), this.getScrollOffsetHeight())
    }

    /**
     * getMaxScrollX
     */
    public getMaxScrollX(): number {
        if (!this.isHorizontalScroll()) { return 0 }
        return this.getClientWidth() - this.getScrollOffsetWidth()
    }

    /**
     * getMaxScrollY
     */
    public getMaxScrollY(): number {
        if (!this.isVerticalScroll()) { return 0 }
        return this.getClientHeight() - this.getScrollOffsetHeight()
    }
    /**
     * @type setBeta
     * @param x 
     * @param y 
     */
    public setBeta(x: number, y: number) {
        this.beta.setAxisX(x)
        this.beta.setAxisY(y)
    }

    /**
     * @type getBeta
     */
    public getBeta(): RollKit.Point {
        return { x: this.beta.getAxisX(), y: this.beta.getAxisY() }
    }
    /**
     * @method setDelta
     */
    public setDelta(x: number, y: number) {
        this.delta.setAxisX(x)
        this.delta.setAxisY(y)
    }
    /**
     * @type getDelta
     */
    public getDelta(): RollKit.Point {
        return { x: this.delta.getAxisX(), y: this.delta.getAxisY() }
    }

    /**
    * @method setTheta
    */
    public setTheta(x: number, y: number) {
        this.theta.setAxisX(x)
        this.theta.setAxisY(y)
    }

    /**
     * get
     */
    public getTheta(): RollKit.Point {
        return { x: this.theta.getAxisX(), y: this.theta.getAxisY() }
    }

    /**
     * @method setEta
     * @param x 
     * @param y 
     */
    public setEta(x: number, y: number): void {
        this.eta.setAxisX(x)
        this.eta.setAxisY(y)
    }

    /**
     * getEta
     */
    public getEta(): RollKit.Point {
        return { x: this.eta.getAxisX(), y: this.eta.getAxisY() }
    }

    /**
     * setIota
     */
    public setIota(x: number, y: number) {
        this.iota.setAxisX(x)
        this.iota.setAxisY(y)
    }

    /**
     * getIota
     */
    public getIota(): RollKit.Point {
        return { x: this.iota.getAxisX(), y: this.iota.getAxisY() }
    }

    /**
    * @method setKappa
    * @param x 
    * @param y 
    */
    public setKappa(x: number, y: number) {
        this.kappa.setAxisX(x)
        this.kappa.setAxisY(y)
    }

    /**
     * @method getZeta
     */
    public getZeta(): RollKit.Point {
        return { x: this.zeta.getAxisX(), y: this.zeta.getAxisY() }
    }

    /**
     * @method setZeta
     */
    public setZeta(x: number, y: number): void {
        this.zeta.setAxisX(x)
        this.zeta.setAxisY(y)
    }

    /**
     * @method updateMode
     * @param absDeltaX 
     * @param absDeltaY 
     */
    public updateMode(absDeltaX: number, absDeltaY: number) {
        if (this.isNoLock() && (!this.isAutoScroll())) {
            if (absDeltaX > absDeltaY + this.meta.getDirectionLockThreshold()) {
                this.setMode(Lock.Horizontal)
            } else if (absDeltaY >= absDeltaX + this.meta.getDirectionLockThreshold()) {
                this.setMode(Lock.Vertical)
            } else {
                this.setMode(Lock.Auto)
            }
        }
    }
    /**
     * @method setScrollStartTime
     */
    public setScrollStartTime(t: number): void {
        this.gamma = t
    }

    /**
   * getScrollStopTime
   */
    public setScrollStopTime(t: number): void {
        this.sigma = t
    }

    /**
     * setState
     * @param state 
     */
    public setState(state: number) {
        this.state = state
    }
    /**
     * getState
     * @returns 
     */
    public getState(): number {
        return this.state
    }
    /**
     * setMode
     * @param mode 
     */
    public setMode(mode: number) {
        this.mode = mode
    }
    /**
     * setStatus
     */
    public setStatus(status: number): void {
        this.status = status
    }

    /**
     * getStatus
     */
    public getStatus(): number {
        return this.status
    }

    /**
    * getResizePolling
    */
    public getResizePolling(): number {
        return this.meta.getResizePolling()
    }

    /**
    * getMouseWheelSpeed
    *  
    */
    public getMouseWheelSpeed(): number {
        return this.meta.getMouseWheelSpeed()
    }
    /**
     * getMouseWheelFactor
     * @returns 
     */
    public getMouseWheelFactor(): number {
        return this.meta.getMouseWheelFactor()
    }
    /**
     * getMouseWheelTime
     */
    public getMouseWheelTime(): number {
        return this.meta.getMouseWheelTime()
    }
    /**
     * getProbeType
     */
    public getProbeType(): number {
        return this.meta.getProbeType()
    }

    /**
     *  getTaskTime
     */
    public  getTaskTime():number {
       return this.getScrollStopTime() - this.getScrollStartTime()
    }

    /**
     * getBounceTime
     */
    public getBounceTime():number {
        return this.meta.getBounceTime()
    }
    /**
     * @method directionXCalc
     */
    public directionXCalc(duration: number, destination: number): RollKit.Momentum {
        if (this.isHorizontalScroll()) {
            let size = this.isSupportBouce() ? this.getClientWidth() : 0
            return this.meta.calculation(this.zeta.getAxisX(), this.eta.getAxisX(), duration, this.getMaxScrollX(), size)
        }
        return { destination: destination, duration: 0 }
    }

    /**
     * @method directionYCalc
     */
    public directionYCalc(duration: number, destination: number): RollKit.Momentum {
        if (this.isVerticalScroll()) {
            let size = this.isSupportBouce() ? this.getClientHeight() : 0
            return this.meta.calculation(this.zeta.getAxisY(), this.eta.getAxisY(), duration, this.getMaxScrollY(), size)
        }
        return { destination: destination, duration: 0 }
    }
    /**
     * isSupportTransition
     */
    public isSupportTransition(): boolean {
        return this.meta.isSupportTransition()
    }

    /**
     * isSupportTransform
     */
    public isSupportTransform(): boolean {
        return this.meta.isSupportTransform()
    }
    /**
     * isSupportHardFast
     */
    public isSupportHardFast() {
        return this.meta.isSupportHardFast()
    }

    /**
     * isSpuuort3D
     */
    public isSpuuort3D() {
        return this.meta.isSpuuort3D()
    }

    /**
     * isFocusOnWrap
     */
    public isFocusOnWrap() {
        return this.meta.isFocusOnWrap()
    }

    /**
     *  isSupportWheel
     */
    public isSupportWheel() {
        return this.meta.isSupportWheel()
    }
    /**
     * 
     * @returns 
     */
    public isSupportPrevent() {
        return this.meta.isSupportPrevent()
    }
    /**
     * @type isLockScrollX
     */
    public isLockScrollX(): boolean {
        return this.mode === Lock.Horizontal
    }
    /**
     * @type isLockScrollY
     */
    public isLockScrollY(): boolean {
        return this.mode === Lock.Vertical
    }
    /**
     * @type isPreventScrollX
     */
    public isPreventScrollX(): boolean {
        return this.meta.isPreventScrollX()
    }

    /**
     * @type isPreventScrollY
     */
    public isPreventScrollY(): boolean {
        return this.meta.isPreventScrollY()
    }
    /**
     *  isStopPropagation():boolean;
     */
    public isStopPropagation(): boolean {
        return this.meta.isStopPropagation();
    }

    /**
     * isSupportBouce
     */
    public isSupportBouce(): boolean {
        return this.meta.isSupportBouce()
    }
    /**
     * @returns boolean
     */
    public isSupportClick(): boolean {
        return this.meta.isSupportClick()
    }

    /**
     * isSupportTap
     */
    public isSupportTap(): boolean {
        return this.meta.isSupportTap()
    }
    /**
      * isSupportFlick
      */
    public isSupportFlick(duration: number, absDistX: number, absDistY: number): boolean {
        const time = this.meta.getFlickLimitTime()
        const distance = this.meta.getFlickLimitdistance()
        return this.meta.isSupportFlick() && ToolKit.isLessThan(duration, time) && ToolKit.isLessThan(absDistX, distance) && ToolKit.isLessThan(absDistY, distance)
    }

    /**
     * isSupportMomentum
     */
    public isSupportMomentum(duration: number, absDistX: number, absDistY: number): boolean {
        const time = this.meta.getMomentunLimitTime()
        const distance = this.meta.getMomentunLimitDistance()
        return this.meta.isSupportMomentum() && ToolKit.isLessThan(duration, time) && (ToolKit.isLessThan(distance, absDistX) || ToolKit.isLessThan(distance, absDistY))
    }

    /**
     * isOutBoundary
     */
    public isOutBoundary(): boolean {
        const pos = this.getZeta()
        let roundX = pos.x
        let roundY = pos.y
        if ((!this.isHorizontalScroll()) || ToolKit.isLessThan(0, pos.x)) {
            roundX = 0
        } else if (ToolKit.isLessThan(pos.x, this.getMaxScrollX())) {
            roundX = this.getMaxScrollX()
        }
        if ((!this.isVerticalScroll()) || ToolKit.isLessThan(0, pos.y)) {
            roundY = 0
        } else if (ToolKit.isLessThan(pos.y, this.getMaxScrollY())) {
            roundY = this.getMaxScrollY()
        }
        return roundX !== pos.x || roundY !== pos.y
    }

    /**
     *  isInvalid
     */
    public isInvalidSlip(timestamp: number, absThetaX: number, absThetaY: number): boolean {
        const time = this.meta.getMomentunLimitTime()
        const distance = this.meta.getMomentunLimitDistance()
        return ToolKit.isLessThan(time, timestamp - this.getScrollStopTime()) && ToolKit.isLessThan(distance, absThetaX) && ToolKit.isLessThan(distance, absThetaY)
    }
    /**
     * 
     * @param timestamp 
     * @returns 
     */
    public isValidSlip(timestamp: number): boolean {
        return ToolKit.isLessThan(this.meta.getMomentunLimitTime(), timestamp - this.getScrollStartTime())
    }

    /**
     * isSupportSnap
     */
    public isSupportSnap(): boolean {
        return this.meta.isSupportSnap()
    }

} 