/**
 * @class Scope
 * @classdesc scope
 * @author niyang
 */
import Axis from "../axis/Axis";
import Feature from "./feature/Feature";
import Momentum from "./momentum/Momentum";
import Wheel from "./wheel/Wheel";
export default class Scope {
    /**
     * @constructor
     * @param el
     */
    constructor(el) {
        this.rootElement = el;
        this.axis = new Axis();
        this.feature = new Feature();
        this.bounce = true;
        this.bounceTime = 800;
        this.specifiedIndex = 0;
        this.probe = 1;
        this.momentum = new Momentum();
        this.clickable = false;
        this.tapable = false;
        this.wheel = new Wheel();
    }
    /**
     * @method getScrollOffsetWidth
     * @description get offset width of scroll element
     * @returns number
     */
    getScrollOffsetWidth() {
        return this.getScrollElement().offsetWidth;
    }
    /**
      * @method getScrollOffsetHeight
      * @description get offset height of scroll element
      * @returns number
      */
    getScrollOffsetHeight() {
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
    rollable(wapper, content) {
        return wapper < content;
    }
    /**
     * @method getMaxScrollWidth
     * @description the max width of scroll
     * @returns number
     */
    getMaxScrollWidth() {
        if (!this.isHScroll()) {
            return 0;
        }
        return this.getClientWidth() - this.getScrollOffsetWidth();
    }
    /**
     * @method getMaxScrollHeight
     * @description the max height of scroll
     * @returns number
     */
    getMaxScrollHeight() {
        if (!this.isVScroll()) {
            return 0;
        }
        return this.getClientHeight() - this.getScrollOffsetHeight();
    }
    /**
    * @method getClientWidth
    * @returns number
    */
    getClientWidth() {
        return this.rootElement.clientWidth;
    }
    /**
      * @method getClientWidth
      * @returns number
      */
    getClientHeight() {
        return this.rootElement.clientHeight;
    }
    getComputedHMomentum(start, duration, pos) {
        return this.isHScroll() ? this.momentum.getComputedMomentum(this.getPosition().x, start, duration, this.getMaxScrollWidth(), this.isBounce() ? this.getClientWidth() : 0) : { destination: pos, duration: 0 };
    }
    getComputedVMomentum(start, duration, pos) {
        return this.isVScroll() ? this.momentum.getComputedMomentum(this.getPosition().y, start, duration, this.getMaxScrollHeight(), this.isBounce() ? this.getClientHeight() : 0) : { destination: pos, duration: 0 };
    }
    setContentSpecifiedIndex(specifiedIndex) {
        this.specifiedIndex = specifiedIndex;
    }
    /**
     * @method getProbe
     * @description get probe
     */
    getProbe() {
        return this.probe;
    }
    /**
     * @method setProbe
     * @param probe
     */
    setProbe(probe) {
        this.probe = probe;
    }
    setScrollX(x) {
        this.feature.setScrollX(x);
    }
    setScrollY(y) {
        this.feature.setScrollY(y);
    }
    setScrollZ(x) {
        this.feature.setScrollZ(x);
    }
    /**
     * @method setScrollMode
     * @param mode
     * @returns undefined
     */
    setScrollMode(mode) {
        this.feature.setMode(mode);
    }
    /**
     * @method setScrollPreventState
     * @param state
     * @returns undefined
     */
    setScrollPreventState(state) {
        this.feature.setPrevent(state);
    }
    /**
     *
     * @param x
     * @param y
     */
    setScrollDirection(x, y) {
        this.feature.setDirection(x, y);
    }
    /**
     * @method setBounce
     * @param bounce
     */
    setBounce(bounce) {
        this.bounce = bounce;
    }
    /**
     * @method setBounceTime
     * @param time
     */
    setBounceTime(time) {
        this.bounceTime = time;
    }
    /**
     * @method getPosition
     *@description get scroll point
     */
    getPosition() {
        return { x: this.axis.getAxisX(), y: this.axis.getAxisY() };
    }
    /**
     * @method setPosition
     * @param x
     * @param y
     */
    setPosition(x, y) {
        this.axis.setAxisX(x);
        this.axis.setAxisY(y);
    }
    /**
     * @method isLockScrollX
     * @description x-scroll  or not
     * @returns boolean
     */
    isLockScrollX() {
        return this.feature.getScrollX() === 1;
    }
    /**
     * @method isLockScrollY
     * @description y-scroll  or not
     * @returns boolean
     */
    isLockScrollY() {
        return this.feature.getScrollY() === 1;
    }
    isNoLocked() {
        return this.feature.getMode() === 0;
    }
    /**
     * @method isFreeScroll
     * @description scroll  or not
     * @returns boolean
     */
    isFreeScroll() {
        return this.feature.getScrollZ() === 1;
    }
    /**
     * @method isXPrevent
     */
    isXPrevent() {
        return this.feature.getPrevent() === 1;
    }
    /**
     * @method isYPrevent
     */
    isYPrevent() {
        return this.feature.getPrevent() === 2;
    }
    isNoPrevent() {
        return this.feature.getPrevent() === 0;
    }
    /**
     * @method isBounce
     * @returns boolean
     */
    isBounce() {
        return this.bounce;
    }
    /**
     * @method getBounceTime
     */
    getBounceTime() {
        return this.bounceTime;
    }
    /**
     * @method isHScroll
     * @description x scroll  or not
     * @returns boolean
     */
    isHScroll() {
        return this.isLockScrollX() && this.rollable(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    /**
     * @method isVScroll
     * @description  y scroll  or not
     * @returns boolean
     */
    isVScroll() {
        return this.isLockScrollY() && this.rollable(this.getClientHeight(), this.getScrollOffsetHeight());
    }
    /**
     * @method getWrapElement
     * @returns this root element
     */
    getWrapElement() {
        return this.rootElement;
    }
    /**
    * @method getScrollElement
    * @returns this scroll element
    */
    getScrollElement() {
        return this.rootElement.children.item(this.specifiedIndex);
    }
    /**
     * @method getCrisisPosition
     * @returns {x,y}
     */
    getCrisisPosition() {
        let pos = this.getPosition();
        let x = pos.x, y = pos.y;
        //left
        if (!this.isHScroll() || pos.x > 0) {
            x = 0;
        }
        else if (pos.x < this.getMaxScrollWidth()) { //right
            x = this.getMaxScrollWidth();
        }
        //top
        if (!this.isVScroll() || pos.y > 0) {
            y = 0;
        }
        else if (pos.y < this.getMaxScrollHeight()) { //bottom
            y = this.getMaxScrollHeight();
        }
        return { x, y };
    }
    /**
     * @method getMaxDistance
     * @description get max scroll distance
     * @returns {x,y}
     */
    getMaxDistance() {
        return { x: this.getMaxScrollWidth(), y: this.getMaxScrollHeight() };
    }
    /**
     * @method getDirectionLockThreshold
     */
    getDirectionLockThreshold() {
        return this.feature.getThreshold();
    }
    setDirectionLockThreshold(threshold) {
        return this.feature.setThreshold(threshold);
    }
    /**
     * @method getMomentumThreshold
     * @description get moment limit distance
     */
    getMomentumThreshold() {
        return this.momentum.getThreshold();
    }
    /**
     * @method setMomentumThreshold
     * @param dist
     * @description set moment limit distance
     */
    setMomentumThreshold(dist) {
        this.momentum.setThreshold(dist);
    }
    /**
     * @method getMomentumPeroid
     * @description get momentum limit time
     */
    getMomentumPeroid() {
        return this.momentum.getPeriod();
    }
    /**
     * @method setMomentumPeroid
     * @param time
     * @description set momentum limit time
     */
    setMomentumPeroid(time) {
        this.momentum.setPeriod(time);
    }
    /**
     * @method setMomentum
     * @param flag
     * @description use momentum or not
     */
    setMomentum(flag) {
        this.momentum.setEnableFlag(flag);
    }
    /**
     * @method isEnableMomentum
     */
    isEnableMomentum() {
        return this.momentum.enabled();
    }
    setDeceleration(deceleration) {
        this.momentum.setDeceleration(deceleration);
    }
    getDeceleration() {
        return this.momentum.getDeceleration();
    }
    setTapabke(tapable) {
        this.tapable = tapable;
    }
    isTapable() {
        return this.tapable;
    }
    setClickable(clickable) {
        this.clickable = clickable;
    }
    isClickable() {
        return this.clickable;
    }
    getComputedMomontum(start, duration, pos, isVertical) {
        return isVertical ? this.getComputedHMomentum(start, duration, pos) : this.getComputedVMomentum(start, duration, pos);
    }
    setMouseWheelSpeed(speed) {
        this.wheel.setWheelSpeed(speed);
    }
    setMouseWheelDirection(dir) {
        this.wheel.setWheelDirection(dir);
    }
    getMouseWheelSpeed() {
        return this.wheel.getWheelSpeed();
    }
    getMouseWheelDirection() {
        return this.wheel.getWheelDirection();
    }
}
