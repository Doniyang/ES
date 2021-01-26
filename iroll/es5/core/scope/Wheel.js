export default class Wheel {
    constructor() {
        this.speed = 20;
        this.direction = 1;
        this.enable = false;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setDirection(drection) {
        this.direction = drection;
    }
    setEnable(enable) {
        this.enable = enable;
    }
    enabled() {
        return this.enable === true;
    }
    getSpeed() {
        return this.speed;
    }
    getDirection() {
        return this.direction;
    }
}
