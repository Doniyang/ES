import PointDigitalizer from './PointDigitalizer'
export default class ContextDigitalizer<T> {
    private context: T
    private point: PointDigitalizer
    constructor(context: T) {
        this.context = context
        this.point = new PointDigitalizer()
    }

    getContext(): T {
        return this.context
    }
    setContext(context: T): void {
        this.context = context
    }

    getStartX(): number {
        return this.point.getStartX()
    }
    getStartY(): number {
        return this.point.getStartY()
    }
    getDeltaX(): number {
        return this.point.getDeltaX()
    }
    getDeltaY(): number {
        return this.point.getDeltaY()
    }
    getDirectionX(): number {
        return this.point.getDirectionX()
    }
    getDirectionY(): number {
        return this.point.getDirectionX()
    }
    getPointX(): number {
        return this.point.getPointX()
    }
    getPointY(): number {
        return this.point.getPointY()
    }

    setStartX(startX: number): void {
        this.point.setStartX(startX)
    }
    setStartY(startY: number): void {
        this.point.setStartY(startY)
    }
    setDeltaX(deltaX: number): void {
        this.point.setDeltaX(deltaX)
    }
    setDeltaY(deltaY: number): void {
        this.point.setDeltaY(deltaY)
    }
    setDirectionX(directionX: number): void {
        this.setDirectionX(directionX)
    }
    setDirectionY(directionY: number): void {
        this.point.setDirectionY(directionY)
    }
    setPointX(pointX: number): void {
        this.point.setPointX(pointX)
    }
    setPointY(pointY: number): void {
        this.point.setPointY(pointY)
    }
}