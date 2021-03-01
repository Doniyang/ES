/**
 * @class Wheel
 * @classdesc some feature of wheel
 * @example 
 *   speed  direction 
 */
export default class Wheel {
    /**
     * @name speed
     */
    private speed: number
    /**
     * @name direction
     * @example 
     *  1 is positive
     *   -1 is negative
     */
    private direction: number
    /**
     * @constructor
     */ 
    constructor() {
        this.speed = 20
        this.direction = 1
    }
    /**
     * @method getWheelSpeed
     * @description get speed of wheel
     */
    getWheelSpeed(): number {
        return this.speed;
    }
    /**
     * @method setWheelSpeed
     * @param speed 
     * @description set speed of wheel
     */
    setWheelSpeed(speed: number): void {
        this.speed = speed
    }
    /**
     * @method setWheelDirection
     * @param direction 
     * @description set direction of wheel
     * @example  
     */ 
    setWheelDirection(direction: number): void {
        this.direction = direction
    }
    /**
     * @method getWheelDirection
     */
    getWheelDirection(): number {
        return this.direction
    }
}