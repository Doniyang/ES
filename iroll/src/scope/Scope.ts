/**
 * @class Scope
 * @classdesc scope
 * @author niyang
 */
import Axis from "../axis/Axis"
import Feature from "./feature/Feature";

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
    private scroll: Feature;
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
     * @constructor
     * @param el 
     */
    constructor(el: HTMLElement) {
        this.rootElement = el;
        this.axis = new Axis();
        this.scroll = new Feature();
        this.bounce = true
        this.bounceTime = 800;
        this.specifiedIndex = 0;
        this.probe = 1
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
     * @method compare
     * @description compare two number
     * @param a 
     * @param b 
     * @returns boolean
     */
    private compare(a: number, b: number): boolean {
        return a < b
    }
    /**
     * @method getMaxScrollWidth
     * @description the max width of scroll 
     * @returns number
     */
    private getMaxScrollWidth(): number {
        if (!this.isLockXScroll()) {
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
        if (!this.isLockYScroll()) {
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
     *@method getScrollWidth
     * @returns number 
     */
    private getScrollWidth(): number {
        if (!this.isLockXScroll()) {
            return this.getClientWidth()
        }
        return this.getScrollOffsetWidth()
    }
    /**
     * @method getScrollHeight
     * @returns number
     */
    private getScrollHeight(): number {
        if (!this.isLockYScroll()) {
            return this.getClientHeight()
        }
        return this.getScrollOffsetHeight()
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
     * @method setScrollMode
     * @param mode
     * @returns undefined
     */
    setScrollMode(mode: number): void {
        this.scroll.setMode(mode)
    }

    /**
     * @method setScrollPreventState
     * @param state
     * @returns undefined
     */
    setScrollPreventState(state: number): void {
        this.scroll.setPrevent(state)
    }
    /**
     * @method setAutoScroll
     * @param automatic
     * @returns undefined
     */
    setAutoScroll(automatic: boolean): void {
        this.scroll.setAutomatic(automatic)
    }
    /**
     * 
     * @param x 
     * @param y 
     */
    setScrollDirection(x: number, y: number): void {
        this.scroll.setDirection(x, y)
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
     * @method isHScroll
     * @description x-scroll  or not
     * @returns boolean
     */
    isHScroll(): boolean {
        return this.scroll.getMode() === 1
    }
    /**
     * @method isYScroll
     * @description y-scroll  or not
     * @returns boolean
     */
    isVScroll(): boolean {
        return this.scroll.getMode() === 2
    }

    isNoLocked() {
        return this.scroll.getMode() === 0
    }
    /**
     * @method isFreeScroll
     * @description scroll  or not
     * @returns boolean
     */
    isFreeScroll(): boolean {
        return this.scroll.isAutomatic()
    }
    /**
     * @method isXPrevent
     */
    isXPrevent():boolean{
        return this.scroll.getPrevent()===1
    }

    /**
     * @method isYPrevent
     */
    isYPrevent():boolean{
        return this.scroll.getPrevent()===2
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
     * @method isLockXScroll
     * @description lock x scroll  or not
     * @returns boolean
     */
    isLockXScroll(): boolean {
        return this.isHScroll() && this.compare(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    /**
     * @method isLockYScroll
     * @description lock y scroll  or not
     * @returns boolean
     */
    isLockYScroll(): boolean {
        return this.isHScroll() && this.compare(this.getClientHeight(), this.getScrollOffsetHeight());
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
        if (!this.isLockXScroll() || pos.x > 0) {
            x = 0
        } else if (pos.x < this.getMaxScrollWidth()) {//right
            x = this.getMaxScrollWidth()
        }
        //top
        if (!this.isLockYScroll() || pos.y > 0) {
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
    getMaxDistance():ScrollKit.Point{
        return {x:this.getMaxScrollWidth(),y:this.getMaxScrollHeight()}
    } 

    getDirectionLockThreshold(){
        return this.scroll.getThreshold()
    }

}