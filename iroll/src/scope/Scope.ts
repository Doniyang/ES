/**
 * @class Scope
 * @classdesc scope
 * @author niyang
 */
import Axis from "../axis/Axis"
import Feature from "./feature/Feature";
import Momentum from "./momentum/Momentum";
import Wheel from "./wheel/Wheel";

export default class Scope {
    /**
     * @description scroll wrap Element
     */
    readonly rootElement: HTMLElement;
    /**
     * @description roll point 
     */
    private axis: Axis;
    /**
     * @description roll direction
     * @see Feature class
     */
    private feature: Feature;
    /**
     * @description content index
     * @default 0
     */
    private specifiedIndex: number;

    /**
     * @name bounce
     * @description bounce in crisis or not
     */
    private bounce: boolean;
    /**
     * @name bounceTime
     * @description the time of bounce animation if bounce true;
     */
    private bounceTime: number;
    /**
     * @name probe 
     * @description the scroll event dispatch mode
     */
    private probe: number;
    /**
     * @name momentum
     */
    private momentum: Momentum;

    private clickable: boolean

    private tapable: boolean

    private wheel:Wheel
    /**
     * @constructor
     * @param el 
     */
    constructor(el: HTMLElement) {
        this.rootElement = el;
        this.axis = new Axis();
        this.feature = new Feature();
        this.bounce = true
        this.bounceTime = 800;
        this.specifiedIndex = 0;
        this.probe = 1;
        this.momentum = new Momentum();
        this.clickable = false
        this.tapable = false
        this.wheel = new Wheel()
    }
    /**
     * @method getScrollOffsetWidth
     * @description get offset width of scroll element
     * @returns number
     */
    private getScrollOffsetWidth(): number {
        return this.getScrollElement().offsetWidth;
    }
    /**
      * @method getScrollOffsetHeight
      * @description get offset height of scroll element
      * @returns number
      */
    private getScrollOffsetHeight(): number {
        return this.getScrollElement().offsetHeight;
    }

    /**
     * @method rollable
     * @param wapper 
     * @param content 
     * @description make sure it is rollable with two number
     * @example 
     *      if x-scroll need:
     *          rollable(wapperWidth，contentWidth)
     *      if y-scroll need:
     *        rollable(wapperHeight，contentHeight)   
     *            
     * @returns boolean
     */
    private rollable(wapper: number, content: number): boolean {
        return wapper < content
    }
    /**
     * @method getMaxScrollWidth
     * @description the max width of scroll 
     * @returns number
     */
    private getMaxScrollWidth(): number {
        if (!this.isHScroll()) {
            return 0;
        }
        return this.getClientWidth() - this.getScrollOffsetWidth()
    }
    /**
     * @method getMaxScrollHeight
     * @description the max height of scroll 
     * @returns number
     */
    private getMaxScrollHeight(): number {
        if (!this.isVScroll()) {
            return 0
        }
        return this.getClientHeight() - this.getScrollOffsetHeight()
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
    private getComputedHMomentum(start: number, duration: number, pos: number): ScrollKit.Momentun {
        return this.isHScroll() ? this.momentum.getComputedMomentum(this.getPosition().x, start, duration, this.getMaxScrollWidth(), this.isBounce() ? this.getClientWidth() : 0) : { destination: pos, duration: 0 };
    }

    private getComputedVMomentum(start: number, duration: number, pos: number): ScrollKit.Momentun {
        return this.isVScroll() ? this.momentum.getComputedMomentum(this.getPosition().y, start, duration, this.getMaxScrollHeight(), this.isBounce() ? this.getClientHeight() : 0) : { destination: pos, duration: 0 };
    }
    
    setContentSpecifiedIndex(specifiedIndex:number):void{
        this.specifiedIndex = specifiedIndex
    }
    /**
     * @method getProbe
     * @description get probe
     */
    getProbe(): number {
        return this.probe
    }

    /**
     * @method setProbe
     * @param probe 
     */
    setProbe(probe: number): void {
        this.probe = probe
    }

    setScrollX(x: number): void {
        this.feature.setScrollX(x)
    }

    setScrollY(y: number): void {
        this.feature.setScrollY(y)
    }

    setScrollZ(x: number): void {
        this.feature.setScrollZ(x)
    }

    /**
     * @method setScrollMode
     * @param mode
     * @returns undefined
     */
    setScrollMode(mode: number): void {
        this.feature.setMode(mode)
    }

    /**
     * @method setScrollPreventState
     * @param state
     * @returns undefined
     */
    setScrollPreventState(state: number): void {
        this.feature.setPrevent(state)
    }
    /**
     * 
     * @param x 
     * @param y 
     */
    setScrollDirection(x: number, y: number): void {
        this.feature.setDirection(x, y)
    }

    /**
     * @method setBounce
     * @param bounce 
     */
    setBounce(bounce: boolean): void {
        this.bounce = bounce
    }
    /**
     * @method setBounceTime
     * @param time 
     */
    setBounceTime(time: number): void {
        this.bounceTime = time
    }
    /**
     * @method getPosition
     *@description get scroll point 
     */
    getPosition(): ScrollKit.Point {
        return { x: this.axis.getAxisX(), y: this.axis.getAxisY() }
    }
    /**
     * @method setPosition
     * @param x 
     * @param y 
     */
    setPosition(x: number, y: number): void {
        this.axis.setAxisX(x);
        this.axis.setAxisY(y);
    }
    /**
     * @method isLockScrollX
     * @description x-scroll  or not
     * @returns boolean
     */
    isLockScrollX(): boolean {
        return this.feature.getMode() === 1
    }
    /**
     * @method isLockScrollY
     * @description y-scroll  or not
     * @returns boolean
     */
    isLockScrollY(): boolean {
        return this.feature.getMode() === 2
    }

    isNoLocked() {
        return this.feature.getMode() === 0
    }

    isScrollX():boolean{
       return this.feature.getScrollX() === 1 
    }

    isScrollY(){
        return this.feature.getScrollY() === 1
    }
    /**
     * @method isFreeScroll
     * @description scroll  or not
     * @returns boolean
     */
    isFreeScroll(): boolean {
        return this.feature.getScrollZ() === 1
    }
    /**
     * @method isXPrevent
     */
    isXPrevent(): boolean {
        return this.feature.getPrevent() === 1
    }

    /**
     * @method isYPrevent
     */
    isYPrevent(): boolean {
        return this.feature.getPrevent() === 2
    }

    isNoPrevent():boolean{
        return this.feature.getPrevent() === 0
    }
    /**
     * @method isBounce
     * @returns boolean
     */
    isBounce(): boolean {
        return this.bounce
    }
    /**
     * @method getBounceTime
     */
    getBounceTime(): number {
        return this.bounceTime;
    }
    /**
     * @method isHScroll
     * @description x scroll  or not
     * @returns boolean
     */
    isHScroll(): boolean {
        return this.isScrollX() && this.rollable(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    /**
     * @method isVScroll
     * @description  y scroll  or not
     * @returns boolean
     */
    isVScroll(): boolean {
        return this.isScrollY() && this.rollable(this.getClientHeight(), this.getScrollOffsetHeight());
    }
    /**
     * @method getWrapElement
     * @returns this root element
     */
    getWrapElement(): HTMLElement {
        return this.rootElement;
    }
    /**
    * @method getScrollElement
    * @returns this scroll element
    */
    getScrollElement(): HTMLElement {
        return this.rootElement.children.item(this.specifiedIndex) as HTMLElement
    }

    /**
     * @method getCrisisPosition
     * @returns {x,y}
     */
    getCrisisPosition(): ScrollKit.Point {
        let pos = this.getPosition();
        let x = pos.x, y = pos.y;
        //left
        if (!this.isHScroll() || pos.x > 0) {
            x = 0
        } else if (pos.x < this.getMaxScrollWidth()) {//right
            x = this.getMaxScrollWidth()
        }
        //top
        if (!this.isVScroll() || pos.y > 0) {
            y = 0
        } else if (pos.y < this.getMaxScrollHeight()) {//bottom
            y = this.getMaxScrollHeight()
        }
        return { x, y }
    }
    /**
     * @method getMaxDistance
     * @description get max scroll distance
     * @returns {x,y}
     */
    getMaxDistance(): ScrollKit.Point {
        return { x: this.getMaxScrollWidth(), y: this.getMaxScrollHeight() }
    }
    /**
     * @method getDirectionLockThreshold
     */
    getDirectionLockThreshold(): number {
        return this.feature.getThreshold()
    }

    setDirectionLockThreshold(threshold:number): void{
        return this.feature.setThreshold(threshold)
    }
    /**
     * @method getMomentumThreshold
     * @description get moment limit distance
     */
    getMomentumThreshold(): number {
        return this.momentum.getThreshold()
    }
    /**
     * @method setMomentumThreshold
     * @param dist
     * @description set moment limit distance 
     */
    setMomentumThreshold(dist: number): void {
        this.momentum.setThreshold(dist)
    }
    /**
     * @method getMomentumPeroid
     * @description get momentum limit time
     */
    getMomentumPeroid(): number {
        return this.momentum.getPeriod()
    }
    /**
     * @method setMomentumPeroid
     * @param time 
     * @description set momentum limit time
     */
    setMomentumPeroid(time: number): void {
        this.momentum.setPeriod(time)
    }
    /**
     * @method setMomentum
     * @param flag 
     * @description use momentum or not
     */
    setMomentum(flag: boolean) {
        this.momentum.setEnableFlag(flag)
    }

    /**
     * @method isEnableMomentum
     */
    isEnableMomentum(): boolean {
        return this.momentum.enabled()
    }

    setDeceleration(deceleration: number): void {
        this.momentum.setDeceleration(deceleration)
    }

    getDeceleration(): number {
        return this.momentum.getDeceleration()
    }

    setTapabke(tapable: boolean): void {
        this.tapable = tapable
    }

    isTapable(): boolean {
        return this.tapable
    }

    setClickable(clickable: boolean) {
        this.clickable = clickable
    }

    isClickable(): boolean {
        return this.clickable
    }

    getComputedMomontum(start: number, duration: number, pos: number, isVertical: boolean): ScrollKit.Momentun {
        return isVertical ? this.getComputedVMomentum(start, duration, pos) : this.getComputedHMomentum(start, duration, pos);
    }

    setMouseWheelSpeed(speed:number): void {
      this.wheel.setWheelSpeed(speed)
    }

    setMouseWheelDirection(dir:number): void {
        this.wheel.setWheelDirection(dir)
    }

    getMouseWheelSpeed(): number {
        return this.wheel.getWheelSpeed()
    }

    getMouseWheelDirection(): number {
        return this.wheel.getWheelDirection()
    }

}