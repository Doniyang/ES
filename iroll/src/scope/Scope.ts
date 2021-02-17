/**
 * @class Scope
 * @classdesc scope
 * @author niyang
 */
import Axis from "../axis/Axis"

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
     * @example 
     *     x:0 ->unlock  1->locked 
     */
    private scroll: Axis;
    /**
     * @description content index
     * @default 0
     */
    private specifiedIndex: number;
    
    /**
     * @name bounce
     * @description bounce in crisis or not
     */
    private bounce:boolean;
    /**
     * @name bounceTime
     * @description the time of bounce animation if bounce true;
     */ 
    private bounceTime:number;
    /**
     * @constructor
     * @param el 
     */
    constructor(el: HTMLElement) {
        this.rootElement = el;
        this.axis = new Axis();
        this.scroll = new Axis();
        this.bounce = true
        this.bounceTime = 800;
        this.specifiedIndex = 0;
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
     * @method setScrollX
     * @param x
     * @returns undefined
     */
    setScrollX(x: number): void {
        this.scroll.setAxisX(x)
    }

    /**
     * @method setScrollY
     * @param y 
     * @returns undefined
     */
    setScrollY(y: number): void {
        this.scroll.setAxisY(y)
    }
    /**
     * @method setScrollZ
     * @param z
     * @returns undefined
     */
    setScrollZ(z: number) {
        this.scroll.setAxisZ(z)
    }
    
    /**
     * @method setBounce
     * @param bounce 
     */
    setBounce(bounce:boolean):void{
        this.bounce = bounce
    }
    /**
     * @method setBounceTime
     * @param time 
     */ 
    setBounceTime(time:number):void{
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
     * @method isXScroll
     * @description x-scroll  or not
     * @returns boolean
     */
    isXScroll(): boolean {
        return this.scroll.getAxisX() === 1
    }
    /**
     * @method isYScroll
     * @description y-scroll  or not
     * @returns boolean
     */
    isYScroll(): boolean {
        return this.scroll.getAxisY() === 1
    }
    /**
     * @method isAxisScroll
     * @description scroll  or not
     * @returns boolean
     */
    isAxisScroll(): boolean {
        return this.scroll.getAxisZ() === 1
    }
    /**
     * @method isBounce
     * @returns boolean
     */  
    isBounce():boolean{
        return this.bounce
    }
    /**
     * @method getBounceTime
     */
    getBounceTime():number{
        return this.bounceTime;
    }
    /**
     * @method isLockXScroll
     * @description lock x scroll  or not
     * @returns boolean
     */
    isLockXScroll(): boolean {
        return this.isXScroll() && this.compare(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    /**
     * @method isLockYScroll
     * @description lock y scroll  or not
     * @returns boolean
     */
    isLockYScroll(): boolean {
        return this.isYScroll() && this.compare(this.getClientHeight(), this.getScrollOffsetHeight());
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
     * @method getClientWidth
     * @returns number
     */
    getClientWidth(): number {
        return this.rootElement.clientWidth;
    }
    /**
      * @method getClientWidth
      * @returns number
      */
    getClientHeight(): number {
        return this.rootElement.clientHeight;
    }

    /**
     *@method getScrollWidth
     * @returns number 
     */
    getScrollWidth(): number {
        if (!this.isLockXScroll()) {
            return this.getClientWidth()
        }
        return this.getScrollOffsetWidth()
    }
    /**
     * @method getScrollHeight
     * @returns number
     */
    getScrollHeight(): number {
        if (!this.isLockYScroll()) {
            return this.getClientHeight()
        }
        return this.getScrollOffsetHeight()
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

}