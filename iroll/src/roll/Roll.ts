import Variate from "./Variate";

/**
 * @class Roll
 * @classdesc some methods  of Roll
 * @author niyang
 */
export default abstract class Roll {
    /**
     * @name roll
     * @type Variate
     */
    private roll: Variate;
    
    /**
     * @description roll state
     * @see
     *      0  -   stop that it can move
     *      1 -  moving  
     */
    private state:number

    constructor(roll: Variate) {
        this.roll = roll
        this.state = 0
    }
      
    /**
     * @method getRoll
     * @returns Variate
     */
    getRoll():Variate{
        return this.roll;
    }
    
    /**
     * @method getState
     * @returns number
     */
    getState(): number {
        return this.state
    }

    /**
     * 
     * @param state number
     */
    setState(state: number): void {
        this.state = state
    }
    /**
     * @method scrollTo
     * @param x 
     * @param y 
     * @param time 
     */
    abstract scrollTo(x: number, y: number, time: number): void;
    /**
     * @method translate
     * @param x 
     * @param y 
     */
    abstract translate(x: number, y: number): void;
    /**
     * @method getPosion
     * @description get point of scroll element
     * @returns {x,y}
     */
    abstract getPosition(): ScrollKit.Point;
    /**
     * @method getComputedPosition
     * @description get point of scroll element
     * @returns {x,y}
     */
    abstract getComputedPosition(): ScrollKit.Point;
    /**
     * @method resetPosition
     */
    abstract resetPosition(): void;
    /**
     * @method stop
     */
    abstract stop(): void;
}