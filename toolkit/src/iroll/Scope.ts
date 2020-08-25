class Rect {
    private top: number
    private left: number
    private width: number
    private height: number
    private axisX: number
    private axixY: number
    constructor() {
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
        this.axisX = 0;
        this.axixY = 0;
    }

    getOffset() {
        return {
            top: this.top,
            left: this.left,
            x: this.axisX,
            y: this.axixY,
            height: this.height,
            width: this.width
        }
    }

    setAxisX(x: number): void {
        this.axisX = x
    }
    setAxisY(y: number): void {
        this.axixY = y
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