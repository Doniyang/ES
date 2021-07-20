/**
 * @class Momentum
 * @classdesc momentum options
 * @author niyang
 */
export default class Momentum {
    /**
     * @constructor
     */
    constructor() {
        this.period = 300;
        this.threshold = 15;
        this.deceleration = 0.0006;
        this.enable = true;
    }
    speedCalculation(dist, tm) {
        return Math.abs(dist) / tm;
    }
    directionCalculation(dist) {
        return dist < 0 ? -1 /* Negative */ : 1 /* Positive */;
    }
    durationCalculation(dist, speed) {
        return dist / speed;
    }
    /**
     * @method getPeriod
     * @description get period
     */
    getPeriod() {
        return this.period;
    }
    /**
     * @method setPeriod
     * @param period
     */
    setPeriod(period) {
        this.period = period;
    }
    /**
     * @method getThreshold
     * @description get threshold value
     */
    getThreshold() {
        return this.threshold;
    }
    /**
     * @method setThreshold
     * @param threshold
     */
    setThreshold(threshold) {
        this.threshold = threshold;
    }
    enabled() {
        return this.enable;
    }
    setEnableFlag(flag) {
        this.enable = flag;
    }
    setDeceleration(deceleration) {
        this.deceleration = deceleration;
    }
    getDeceleration() {
        return this.deceleration;
    }
    getComputedMomentum(current, start, time, margin, size) {
        let dist = current - start, speed = this.speedCalculation(dist, time), deceleration = this.getDeceleration(), direction = this.directionCalculation(dist), destination, duration;
        destination = current + (speed * speed) / (2 * deceleration) * direction;
        duration = speed / deceleration;
        if (destination < margin) {
            destination = size ? margin - (size / 2.5 * (speed / 8)) : margin;
            dist = Math.abs(destination - current);
            duration = dist / speed;
        }
        else if (destination > 0) {
            destination = size ? size / 2.5 * (speed / 8) : 0;
            dist = Math.abs(current) + destination;
            duration = dist / speed;
        }
        return {
            destination: Math.round(destination),
            duration: duration
        };
    }
}
