import Feature from "../Feature"

/**
 * @class Wheel
 * @classdesc some feature of wheel
 * @example
 *   speed  direction
 */
export default class MouseeWheel  extends Feature{
    /**
     * @name speed
     */
    private speed: number
    /**
     * @name invert
     */
    private invert: boolean

    private time:number
    /**
     * @constructor
     */
    constructor() {
        super(false)
        this.speed = 20
        this.invert = false
        this.time = 300
    }

    /**
     * @method getWheelSpeed
     * @description get speed of wheel
     */
    getSpeed(): number {
        return this.speed;
    }   
    /**
     * @method getFactor
     */
    getFactor(): number {
        return this.invert ? -1 : 1;
    }
    /**
     * @method getTime
     * @returns 
     */ 
    getTime():number{
        return this.time
    }
}
