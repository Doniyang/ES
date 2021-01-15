export default class Wheel {
    private speed: number;
    private direction: number;
    private enable: boolean
    constructor() {
        this.speed = 20;
        this.direction = 1;
        this.enable = false
    }

    setSpeed(speed: number): void {
        this.speed = speed
    }
    setDirection(drection: number): void {
        this.direction = drection
    }

    setEnable(enable: boolean): void {
        this.enable = enable
    }

    enabled(): boolean {
        return this.enable === true
    }

    getSpeed(): number {
        return this.speed;
    }

    getDirection(): number {
        return this.direction;
    }



}