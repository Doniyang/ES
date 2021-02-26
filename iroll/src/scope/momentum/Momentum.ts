import { Direction } from "src/shared";

/**
 * @class Momentum
 * @classdesc momentum options
 * @author niyang
 */
export default class Momentum {
    /**
     * @name period
     * @description the time of momentum limit
     */
    private period: number;
    /**
     * @name threshold
     * @description the distance of momentum limit
     */
    private threshold: number;
    /**
     * @name enabled
     */
    private enable: boolean
    /**
     * @name deceleration
     */
    private deceleration:number
    /**
     * @constructor
     */
    constructor() {
        this.period = 300
        this.threshold = 15
        this.deceleration = 0.0006
        this.enable = true
    }

    private speedCalculation(dist:number,tm:number) {
        return Math.abs(dist)/tm
    }

    private directionCalculation(dist:number){
        return dist<0?Direction.Negative:Direction.Positive
    }
    
    private durationCalculation(dist:number,speed:number){
        return dist/speed
    }
    /**
     * @method getPeriod
     * @description get period
     */
    getPeriod(): number {
        return this.period
    }
    /**
     * @method setPeriod
     * @param period 
     */
    setPeriod(period: number): void {
        this.period = period
    }
    /**
     * @method getThreshold
     * @description get threshold value
      */
    getThreshold(): number {
        return this.threshold
    }
    /**
     * @method setThreshold
     * @param threshold 
     */
    setThreshold(threshold: number): void {
        this.threshold = threshold
    }

    enabled(): boolean {
        return this.enable
    }

    setEnableFlag(flag: boolean): void {
        this.enable = flag
    }

    setDeceleration(deceleration:number):void{
        this.deceleration = deceleration
    }

    getDeceleration():number{
        return this.deceleration
    }

    getComputedMomentum(current:number,start:number,time:number,margin:number,size:number):ScrollKit.Momentun{
        let dist:number= current - start,
        speed:number = this.speedCalculation(dist,time),
        deceleration = this.getDeceleration(),
        direction = this.directionCalculation(dist),
        destination,
        duration;


    destination = current + ( speed * speed ) / ( 2 * deceleration ) * direction;
    duration = speed / deceleration;

    if ( destination < margin ) {
        destination = size ? margin - ( size / 2.5 * ( speed / 8 ) ) : margin;
        dist = Math.abs(destination - current);
        duration = dist / speed;
    } else if ( destination > 0 ) {
        destination = size ? size / 2.5 * ( speed / 8 ) : 0;
        dist = Math.abs(current) + destination;
        duration = dist / speed;
    }

    return {
        destination: Math.round(destination),
        duration: duration
    };
    }
}