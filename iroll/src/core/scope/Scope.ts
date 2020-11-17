import Axis from "../axis/Axis"

export default class Scope {
    readonly rootElement: HTMLElement;
    private deceleration: number;
    private passthrough: number;
    private threshold: number;
    private time: number;
    private bounce: boolean;
    private momentum: boolean;
    private axis: Axis;
    private scroll: Axis;
    private clickable: boolean;
    private tap: boolean;
    private HWCompositing:boolean
    constructor(el: HTMLElement) {
        this.rootElement = el;
        this.axis = new Axis();
        this.scroll = new Axis();
        this.passthrough = 0;
        this.threshold = 0;
        this.time = 600
        this.bounce = true
        this.momentum = true
        this.clickable = false
        this.tap = false
        this.deceleration = 0.0006
        this.HWCompositing = true
    }

    private getScrollOffsetWidth(): number {
        return this.getScrollElement().offsetWidth;
    }

    private getScrollOffsetHeight(): number {
        return this.getScrollElement().offsetHeight;
    }

    private compare(a: number, b: number): boolean {
        return a < b
    }

    setPassthrough(sign: number): void {
        this.passthrough = sign
    }

    setThreshold(hold: number): void {
        this.threshold = hold
    }

    setScrollX(x: number): void {
        this.scroll.setAxisX(x)
    }

    setScrollY(y: number): void {
        this.scroll.setAxisY(y)
    }

    setScrollZ(z: number) {
        this.scroll.setAxisZ(z)
    }

    setBounce(bounce: boolean): void {
        this.bounce = bounce;
    }

    setMomentum(momentum: boolean): void {
        this.momentum = momentum
    }

    setDeceleration(deceleration: number): void {
        this.deceleration = deceleration
    }

    setBounceTime(time: number): void {
        this.time = time;
    }

    setClickable(clickable: boolean): void {
        this.clickable = clickable
    }

    setTap(tap: boolean): void {
        this.tap = tap
    }

    setHWCompositing(isComposition:boolean):void{
        this.HWCompositing =isComposition
    }

    position(): ScrollKit.Point {
        return { x: this.axis.getAxisX(), y: this.axis.getAxisY() }
    }
    setAxis(x: number, y: number): void {
        this.axis.setAxisX(x);
        this.axis.setAxisY(y);
    }

    isAxisXPassthrough(): boolean {
        return this.passthrough === 1
    }

    isAxisYPassthrough(): boolean {
        return this.passthrough === 2
    }

    isAxisXScroll(): boolean {
        return this.scroll.getAxisX() === 1
    }

    isAxisYScroll(): boolean {
        return this.scroll.getAxisY() === 1
    }

    isAxisScroll(): boolean {
        return this.scroll.getAxisZ() === 1
    }

    isLockAxisXScroll(): boolean {
        return this.isAxisXScroll() && this.compare(this.getClientWidth(), this.getScrollOffsetWidth());
    }

    isLockAxisYScroll(): boolean {
        return this.isAxisYScroll() && this.compare(this.getClientHeight(), this.getScrollOffsetHeight());
    }

    isBounce(): boolean {
        return this.bounce;
    }

    isMomentum(): boolean {
        return this.momentum
    }

    isClickable(): boolean {
        return this.clickable
    }

    isTap(): boolean {
        return this.tap
    }

    isHWCompositing():boolean{
        return this.HWCompositing
    }

    getDeceleration(): number {
        return this.deceleration
    }

    getBounceTime(): number {
        return this.time;
    }

    getThreshold(): number {
        return this.threshold
    }

    getWrapElement():HTMLElement{
        return this.rootElement;
    }

    getScrollElement(): HTMLElement {
        return this.rootElement.children.item(0) as HTMLElement
    }

    getClientWidth(): number {
        return this.rootElement.clientWidth;
    }

    getClientHeight(): number {
        return this.rootElement.clientHeight;
    }

    getScrollWidth(): number {
        if (!this.isLockAxisXScroll()) {
            return this.getClientWidth()
        }
        return this.getScrollOffsetWidth()
    }

    getScrollHeight(): number {
        if (!this.isLockAxisYScroll()) {
            return this.getClientHeight()
        }
        return this.getScrollOffsetHeight()
    }

    getMaxScrollWidth(): number {
        if (!this.isLockAxisXScroll()) {
            return 0;
        }
        return this.getClientWidth() - this.getScrollOffsetWidth()
    }

    getMaxScrollHeight(): number {
        if (!this.isLockAxisYScroll()) {
            return 0
        }
        return this.getClientHeight() - this.getScrollOffsetHeight()
    }

}