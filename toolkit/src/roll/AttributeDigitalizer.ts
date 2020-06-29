import PointDigitalizer from './PointDigitalizer'
import StateDigitalizer from './StateDigitalizer'
import PeriodDigitalizer from './PeriodDigitalizer'
export default class AttributeDigitalizer {
    private point: PointDigitalizer
    private state: StateDigitalizer
    private period: PeriodDigitalizer;
    constructor() {
        this.point = new PointDigitalizer()
        this.state = new StateDigitalizer()
        this.period = new PeriodDigitalizer()
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
    getState(): number {
        return this.state.getState()
    }
    setState(state: number): void {
        this.state.setState(state)
    }
    getStartTime(): number {
        return this.period.getStartTime()
    }
    setStartTime(time: number): void {
        this.period.setStartTime(time)
    }

    getEndTime(): number {
        return this.period.getEndTime()
    }
    setEndTime(time: number): void {
        this.period.setEndTime(time)
    }
}