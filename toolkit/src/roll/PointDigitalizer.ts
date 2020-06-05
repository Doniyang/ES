export default class PointDigitalizer {
    private startX: number
    private startY: number
    private deltaX: number
    private deltaY: number
    private directionX: number
    private directionY: number
    private pointX: number
    private pointY: number
    constructor() {
        this.startX = 0
        this.startY = 0
        this.deltaX = 0
        this.deltaY = 0
        this.directionX = 0
        this.directionY = 0
        this.pointX = 0
        this.pointY = 0
    }
    getStartX(): number {
        return this.startX
    }
    getStartY(): number {
        return this.startY
    }
    getDeltaX(): number {
        return this.deltaX
    }
    getDeltaY(): number {
        return this.deltaY
    }
    getDirectionX(): number {
        return this.directionX
    }
    getDirectionY(): number {
        return this.directionY
    }
    getPointX(): number {
        return this.pointX
    }
    getPointY(): number {
        return this.pointY
    }

    setStartX(startX: number): void {
        this.startX = startX
    }
    setStartY(startY: number): void {
        this.startY = startY
    }
    setDeltaX(deltaX: number): void {
        this.deltaX = deltaX
    }
    setDeltaY(deltaY: number): void {
        this.deltaY = deltaY
    }
    setDirectionX(directionX: number): void {
        this.directionX = directionX
    }
    setDirectionY(directionY: number): void {
        this.directionY = directionY
    }
    setPointX(pointX: number): void {
        this.pointX = pointX
    }
    setPointY(pointY: number): void {
        this.pointY = pointY
    }
}