/**
 * @class Wheel
 * @classdesc some feature of wheel
 * @example
 *   speed  direction
 */
export default class Wheel {
    /**
     * @constructor
     */
    constructor() {
        this.speed = 20;
        this.direction = 1;
    }
    /**
     * @method getWheelSpeed
     * @description get speed of wheel
     */
    getWheelSpeed() {
        return this.speed;
    }
    /**
     * @method setWheelSpeed
     * @param speed
     * @description set speed of wheel
     */
    setWheelSpeed(speed) {
        this.speed = speed;
    }
    /**
     * @method setWheelDirection
     * @param direction
     * @description set direction of wheel
     * @example
     */
    setWheelDirection(direction) {
        this.direction = direction;
    }
    /**
     * @method getWheelDirection
     */
    getWheelDirection() {
        return this.direction;
    }
}
