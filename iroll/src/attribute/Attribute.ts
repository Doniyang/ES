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
   public getOriginY():number {
       return this.origin.getAxisY()
   }
   
   /**
    * @description set start point
    * @param x 
    * @param y 
    * @return void
    */
   public setOrigin(x:number,y:number):void{
      this.origin.setAxisX(x)
      this.origin.setAxisY(y)
   }

    

}