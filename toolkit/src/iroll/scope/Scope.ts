import Axis from "../axis/Axis"

export default class Scope {
    private top: number
    private left: number
    private width: number
    private height: number
    private axis: Axis;
    private minScroll: Axis;
    private maxScroll: Axis;
    constructor() {
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.axis = new Axis();
        this.minScroll = new Axis();
        this.maxScroll = new Axis();
    }

    offset() {
        return {
            top: this.top,
            left: this.left,
            x: this.axis.getAxisX(),
            y: this.axis.getAxisY(),
            height: this.height,
            width: this.width
        }
    }

    position(): ScrollKit.Point {
        return { x: this.axis.getAxisX(), y: this.axis.getAxisY() }
    }
    setAxis(x: number, y: number): void {
        this.axis.setAxisX(x);
        this.axis.setAxisY(y);
    }

    getMinScroll(): ScrollKit.Point {
        return { x: this.minScroll.getAxisX(), y: this.minScroll.getAxisY() }
    }

    setMinScroll(x: number, y: number): void {
        this.minScroll.setAxisX(x)
        this.minScroll.setAxisY(y)
    }

    getMaxScroll(): ScrollKit.Point {
        return { x: this.maxScroll.getAxisX(), y: this.maxScroll.getAxisY() }
    }

    setMaxScroll(x: number, y: number): void {
        this.maxScroll.setAxisX(x)
        this.maxScroll.setAxisY(y)
    }

    setTop(t: number): void {
        this.top = t
    }

    setLeft(left: number): void {
        this.left = left
    }

    setHeight(h: number): void {
        this.height = h
    }

    setWidth(w: number): void {
        this.width = w
    }
}