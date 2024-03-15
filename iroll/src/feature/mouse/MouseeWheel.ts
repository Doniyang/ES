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
    /**
     * @name time
     */ 
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
    public getSpeed(): number {
        return this.speed;
    }   
    /**
     * @method getFactor
     */
    public getFactor(): number {
        return this.invert ? -1 : 1;
    }
    /**
     * @method getTime
     * @returns 
     */ 
    public getTime():number{
        return this.time
    }
}
