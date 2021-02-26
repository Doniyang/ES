export default class Wheel {
    constructor() {
        this.speed = 20;
        this.direction = 1;
    }
    getWheelSpeed() {
        return this.speed;
    }
    setWheelSpeed(speed) {
        this.speed = speed;
    }
    setWheelDirection(direction) {
        this.direction = direction;
    }
    getWheelDirection() {
        return this.direction;
    }
}
