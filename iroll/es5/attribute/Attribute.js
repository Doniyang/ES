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
    constructor() {
        this.delta = new Axis();
        this.origin = new Axis();
        this.destination = new Axis();
        this.point = new Axis();
        this.absOrigin = new Axis();
        this.state = 0;
        this.startTime = 0;
        this.endTime = 0;
    }
    /**
     * @method getOriginX
     * @description the start point of X-Coordinate
     * @return number
     */
    getOriginX() {
        return this.origin.getAxisX();
    }
    /**
     * @method getOriginY
     * @description the start point of Y-Coordinate
     * @return number
     */
    getOriginY() {
        return this.origin.getAxisY();
    }
    /**
     * @description set start point
     * @param x
     * @param y
     * @return void
     */
    setOrigin(x, y) {
        this.origin.setAxisX(x);
        this.origin.setAxisY(y);
    }
    /**
     * @method getDestinationX
     * @description the destination point of X-Coordinate
     * @return number
     */
    getDestinationX() {
        return this.destination.getAxisX();
    }
    /**
     * @method getDestinationY
     * @description the destination point of Y-Coordinate
     * @return number
     */
    getDestinationY() {
        return this.destination.getAxisY();
    }
    /**
     * @description set destination point
     * @param x
     * @param y
     * @return void
     */
    setDestination(x, y) {
        this.destination.setAxisX(x);
        this.destination.setAxisY(y);
    }
    /**
         * @method getDeltaX
         * @description the delta point of X-Coordinate
         * @return number
         */
    getDeltaX() {
        return this.delta.getAxisX();
    }
    /**
     * @method getDeltaY
     * @description the delta point of Y-Coordinate
     * @return number
     */
    getDeltaY() {
        return this.delta.getAxisY();
    }
    /**
     * @description set delta point
     * @param x
     * @param y
     * @return void
     */
    setDelta(x, y) {
        this.destination.setAxisX(x);
        this.destination.setAxisY(y);
    }
    /**
    * @method getState
    * @description the state
    * @return number
    */
    getState() {
        return this.state;
    }
    /**
     * @description set state
     * @param state
     * @return void
     */
    setState(state) {
        this.state = state;
    }
    /**
    * @method getStartTime
    * @description the start time
    * @return number
    */
    getStartTime() {
        return this.startTime;
    }
    /**
     * @method setStartTime
     * @description set start time
     * @param time
     * @return void
     */
    setStartTime(time) {
        this.startTime = time;
    }
    /**
        * @method getEndTime
        * @description the end time
        * @return number
        */
    getEndTime() {
        return this.endTime;
    }
    /**
     * @method setEndTime
     * @description set endTime
     * @param time
     * @return void
     */
    setEndTime(time) {
        this.endTime = time;
    }
    /**
     * @method getPointX
     * @description x of scroll point
     */
    getPointX() {
        return this.point.getAxisX();
    }
    /**
     * @method getPointY
     * @description y of scroll point
     */
    getPointY() {
        return this.point.getAxisY();
    }
    /**
     * @method setPoint
     * @param x
     * @param y
     */
    setPoint(x, y) {
        this.point.setAxisX(x);
        this.point.setAxisY(y);
    }
    /**
     * @method getAbsOriginX
     */
    getAbsOriginX() {
        return this.absOrigin.getAxisX();
    }
    getAbsOriginY() {
        return this.absOrigin.getAxisY();
    }
    /**
     * @method setAbsOrigin
     * @param x
     * @param y
     */
    setAbsOrigin(x, y) {
        this.absOrigin.setAxisX(x);
        this.absOrigin.setAxisY(y);
    }
}
