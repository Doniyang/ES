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
     * @constructor
     */
    constructor() {
        this.period = 300
        this.threshold = 15
        this.enable = true
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
}