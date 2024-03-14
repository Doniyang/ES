import { Direction } from "../../shared";
import Feature from "../Feature";

/**
 * @class Momentum
 * @classdesc momentum options
 * @author niyang
 */
export default class Momentum extends Feature {
    /**
     * @name time
     * @description the time of momentum limit
     */
    private time: number;
    /**
     * @name distance
     * @description the distance of momentum limit
     */
    private distance: number;
    /**
     * @name deceleration
     */
    private deceleration: number

    /**
     * @constructor
     */
    constructor() {
        super(true)
        this.time = 300
        this.distance = 15
        this.deceleration = 0.0006
    }

    private speed(destination: number, tm: number) {
        return Math.abs(destination) / tm
    }

    private direction(destination: number) {
        return destination < 0 ? Direction.Negative : Direction.Positive
    }
    /**
     * @method getTime
     * @description get period
     */
    getTime(): number {
        return this.time
    }

    /**
     * @method setPeriod
     * @param period
     */
    setTime(period: number): void {
        this.period = period
    }

    /**
     * @method getThreshold
     * @description get threshold value
     */
    getDistance(): number {
        return this.distance
    }

    /**
     * @method setDistance
     * @param distance
     */
    setDistance(distance: number): void {
        this.distance = distance
    }

    setDeceleration(deceleration: number): void {
        this.deceleration = deceleration
    }

    getDeceleration(): number {
        return this.deceleration
    }

    calculation(current: number, start: number, time: number, margin: number, size: number): RollKit.Momentum {
        let dist: number = current - start,
            speed: number = this.speed(dist, time),
            deceleration = this.getDeceleration(),
            direction = this.direction(dist),
            destination,
            duration;


        destination = current + (speed * speed) / (2 * deceleration) * direction;
        duration = speed / deceleration;

        if (destination < margin) {
            destination = size ? margin - (size / 2.5 * (speed / 8)) : margin;
            dist = Math.abs(destination - current);
            duration = dist / speed;
        } else if (destination > 0) {
            destination = size ? size / 2.5 * (speed / 8) : 0;
            dist = Math.abs(current) + destination;
            duration = dist / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        }
    }
}
