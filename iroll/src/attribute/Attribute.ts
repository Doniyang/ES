import Axis from "../axis/Axis";

/**
 * @module attribute
 * @class Attribute
 * @classdesc a list of attrs  for IRoll
 * @description a list of attrs
 * @see
 *    origin @type Axis
 *    destination @type Axis 
 *    delta  @type Axis
 *    state  @type Number
 *    startTime @type Number
 *    endTime   @type Number
 * @author niyang
 */
export default class Attribute {
    /**
     * @type Axis
     * @description the orgin point
     */
    private origin: Axis;
    /**
    * @type Axis
    * @description end point
    */
    private destination: Axis;
    /**
     * @type Axis
     * @description the offset from start to end
     */
    private delta: Axis;
    /**
      * @type Number
      * @description the state for roll 
     * @example  
     *      0 is start
     *      1 is move
     *      2 is end
     *      3 is refresh
     */
    private state: number;
    /**
     * @type number
     * @description start time
     */
    private startTime: number;
    /**
     * @type number
     * @description end time
     */
    private endTime: number;

    constructor() {
        this.delta = new Axis();
        this.origin = new Axis();
        this.destination = new Axis();
        this.state = 0
        this.startTime = 0
        this.endTime = 0;
    }


    /**
     * @method getOriginX
     * @description the start point of X-Coordinate
     * @return number 
     */
    public getOriginX() {
        return this.origin.getAxisX()
    }

    /**
     * @method getOriginY
     * @description the start point of Y-Coordinate
     * @return number 
     */
    public getOriginY(): number {
        return this.origin.getAxisY()
    }

    /**
     * @description set start point
     * @param x 
     * @param y 
     * @return void
     */
    public setOrigin(x: number, y: number): void {
        this.origin.setAxisX(x)
        this.origin.setAxisY(y)
    }

    /**
     * @method getDestinationX
     * @description the destination point of X-Coordinate
     * @return number 
     */
    public getDestinationX(): number {
        return this.destination.getAxisX()
    }

    /**
     * @method getDestinationY
     * @description the destination point of Y-Coordinate
     * @return number 
     */
    public getDestinationY(): number {
        return this.destination.getAxisY()
    }


    /**
     * @description set destination point
     * @param x 
     * @param y 
     * @return void
     */
    public setDestination(x: number, y: number): void {
        this.destination.setAxisX(x);
        this.destination.setAxisY(y);
    }

    /**
         * @method getDeltaX
         * @description the delta point of X-Coordinate
         * @return number 
         */
    public getDeltaX(): number {
        return this.delta.getAxisX()
    }

    /**
     * @method getDeltaY
     * @description the delta point of Y-Coordinate
     * @return number 
     */
    public getDeltaY(): number {
        return this.delta.getAxisY()
    }


    /**
     * @description set delta point
     * @param x 
     * @param y 
     * @return void
     */
    public setDelta(x: number, y: number): void {
        this.destination.setAxisX(x);
        this.destination.setAxisY(y);
    }

    /**
    * @method getState
    * @description the state
    * @return number 
    */
    getState(): number {
        return this.state
    }

    /**
     * @description set state
     * @param state
     * @return void
     */
    setState(state: number): void {
        this.state = state
    }

    /**
    * @method getStartTime
    * @description the start time
    * @return number 
    */
    getStartTime(): number {
        return this.startTime
    }

    /**
     * @method setStartTime
     * @description set start time
     * @param time
     * @return void
     */
    setStartTime(time: number): void {
        this.startTime = time
    }

    /**
        * @method getEndTime
        * @description the end time
        * @return number 
        */
    getEndTime(): number {
        return this.endTime
    }

    /**
     * @method setEndTime
     * @description set endTime
     * @param time
     * @return void
     */
    setEndTime(time: number): void {
        this.endTime = time
    }

}