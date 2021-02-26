export default class Wheel {
    private speed: number
    private direction: number

    constructor() {
        this.speed = 20
        this.direction = 1
    }

    getWheelSpeed(): number {
        return this.speed;
    }

    setWheelSpeed(speed: number): void {
        this.speed = speed
    }

    setWheelDirection(direction: number): void {
        this.direction = direction
    }

    getWheelDirection(): number {
        return this.direction
    }
}