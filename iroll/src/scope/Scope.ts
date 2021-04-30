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
    /**
     * @name clickable
     */
    private clickable: boolean
    /**
     * @name tapable
     */
    private tapable: boolean
    /**
     * @name wheel
     */
    private wheel: Wheel

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

    /**
     * @method getComputedHorizontalMomentum
     * @param start
     * @param duration
     * @param pos
     * @description compute momentum  of horizontal
     */
    private getComputedHorizontalMomentum(start: number, duration: number, pos: number): ScrollKit.Momentum {
        return this.isHScroll() ? this.momentum.getComputedMomentum(this.getPosition().x, start, duration, this.getMaxScrollWidth(), this.isBounce() ? this.getClientWidth() : 0) : {
            destination: pos,
            duration: 0
        };
    }

    /**
     * @method getComputedVerticalMomentum
     * @param start
     * @param duration
     * @param pos
     * @description compute momentum  of vertical
     */
    private getComputedVerticalMomentum(start: number, duration: number, pos: number): ScrollKit.Momentum {
        return this.isVScroll() ? this.momentum.getComputedMomentum(this.getPosition().y, start, duration, this.getMaxScrollHeight(), this.isBounce() ? this.getClientHeight() : 0) : {
            destination: pos,
            duration: 0
        };
    }

    /**
     * @method setContentSpecifiedIndex
     * @param specifiedIndex
     * @description  set scroll element index of root element
     */
    setContentSpecifiedIndex(specifiedIndex: number): void {
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

    /**
     * @method setScrollX
     * @param x
     * @description set scroll x-axis or not
     */
    setScrollX(x: number): void {
        this.feature.setScrollX(x)
    }

    /**
     * @method setScrollY
     * @param y
     * @description set scroll y-axis or not
     */
    setScrollY(y: number): void {
        this.feature.setScrollY(y)
    }

    /**
     * @method setScrollZ
     * @param z
     * @description  set free scroll or not
     */
    setScrollZ(z: number): void {
        this.feature.setScrollZ(z)
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
        return {x: this.axis.getAxisX(), y: this.axis.getAxisY()}
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

    /**
     * @method isNoLocked
     */
    isNoLocked() {
        return this.feature.getMode() === 0
    }

    /**
     * @method isScrollX
     */
    isScrollX(): boolean {
        return this.feature.getScrollX() === 1
    }

    /**
     * @method isScrollY
     */
    isScrollY() {
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

    /**
     * @method isNoPrevent
     */
    isNoPrevent(): boolean {
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
        return {x, y}
    }

    /**
     * @method getMaxDistance
     * @description get max scroll distance
     * @returns {x,y}
     */
    getMaxDistance(): ScrollKit.Point {
        return {x: this.getMaxScrollWidth(), y: this.getMaxScrollHeight()}
    }

    /**
     * @method getDirectionLockThreshold
     */
    getDirectionLockThreshold(): number {
        return this.feature.getThreshold()
    }

    /**
     * @method setDirectionLockThreshold
     * @param threshold
     */
    setDirectionLockThreshold(threshold: number): void {
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
     * @method shouldMomentum
     */
    shouldMomentum(): boolean {
        return this.momentum.enabled()
    }

    /**
     * @method setDeceleration
     * @param deceleration
     * @description set deceleration of momentum
     */
    setDeceleration(deceleration: number): void {
        this.momentum.setDeceleration(deceleration)
    }

    /**
     * @method getDeceleration
     * @description get deceleration of momentum
     */
    getDeceleration(): number {
        return this.momentum.getDeceleration()
    }

    /**
     * @method setTapable
     * @param tapable
     * @description set use tap event or not
     */
    setTapable(tapable: boolean): void {
        this.tapable = tapable
    }

    /**
     * @method isTapable
     * @description tab event is enabled or not
     */
    isTapable(): boolean {
        return this.tapable
    }

    /**
     * @method setClickable
     * @param clickable
     * @description set use click event or not
     */
    setClickable(clickable: boolean) {
        this.clickable = clickable
    }

    /**
     * @method isClickable
     * @description click event is enabled or not
     */
    isClickable(): boolean {
        return this.clickable
    }

    /**
     * @method getComputedMomontum
     * @param start
     * @param duration
     * @param pos
     * @param isVertical
     * @description get moentum distance
     */
    getComputedMomontum(start: number, duration: number, pos: number, isVertical: boolean): ScrollKit.Momentum {
        return isVertical ? this.getComputedVerticalMomentum(start, duration, pos) : this.getComputedHorizontalMomentum(start, duration, pos);
    }

    /**
     * @method setMouseWheelSpeed
     * @param speed
     * @description set mouse wheel speed
     */
    setMouseWheelSpeed(speed: number): void {
        this.wheel.setWheelSpeed(speed)
    }

    /**
     * @method setMouseWheelDirection
     * @param dir
     * @description set mouse wheel direction
     */
    setMouseWheelDirection(dir: number): void {
        this.wheel.setWheelDirection(dir)
    }

    /**
     * @method getMouseWheelSpeed
     */
    getMouseWheelSpeed(): number {
        return this.wheel.getWheelSpeed()
    }

    /**
     * @method getMouseWheelDirection
     */
    getMouseWheelDirection(): number {
        return this.wheel.getWheelDirection()
    }

}
