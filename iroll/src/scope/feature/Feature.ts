import Axis from "src/axis/Axis";

/**
 * @class Feature
 * @author niyang
 */
export default class Feature {
    /**
     * @name mode
     * @description scroll mode
     * @example 
     *    0 ------ no locked
     *    1 ------ x is loacked
     *    2 ------ y is locked 
     */
    private mode: number;
    /**
     * @name direction
     * @description scroll direction
     */
    private direction: Axis;
    /**
     * @name prevent
     * @description scroll event passthoungh
     * @example
     *     0 ---- free
     *     1 --- x-prevent
     *      2--- y-prevent 
     */
    private prevent: number;
    /**
     * @name automatic
     * @description automatic scroll or not
     */
    private automatic: boolean
    /**
     * @type number
     * @description scroll direction threshold
     */
    private threshold: number
    constructor() {
        this.mode = 2
        this.direction = new Axis();
        this.prevent = 0
        this.automatic = false
        this.threshold = 5
    }

    setMode(mode: number): void {
        this.mode = mode
    }
    getMode(): number {
        return this.mode
    }

    setDirection(x: number, y: number): void {
        this.direction.setAxisX(x)
        this.direction.setAxisY(y)
    }

    getDirectionX(): number {
        return this.direction.getAxisX()
    }
    getDirectionY(): number {
        return this.direction.getAxisY()
    }

    setPrevent(prevent: number): void {
        this.prevent = prevent
    }

    getPrevent(): number {
        return this.prevent
    }

    setAutomatic(automatic: boolean): void {
        this.automatic = automatic
    }

    isAutomatic(): boolean {
        return this.automatic
    }

    getThreshold(): number {
        return this.threshold
    }

    setThreshold(threshold: number): void {
        this.threshold = threshold
    }
}