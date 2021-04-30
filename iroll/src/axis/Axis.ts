/**
 * @module coordinate
 * @package axis
 * @class Axis 
 * @constructor
 * @classdesc a series of point in coordinate
 * @author niyang
 * @description {x,y,z}
 */
export default class Axis {
    /**
     * @type number
     * @description x-coordiante
     */
    private axisX: number;
    /**
     * @type number
     * @description y-coordiante
     */
    private axisY: number;
    /**
      * @type number
      * @description z-coordiante
      */
    private axisZ: number;

    constructor() {
        this.axisX = 0;
        this.axisY = 0;
        this.axisZ = 0;
    }

    getAxisX(): number {
        return this.axisX;
    }
    getAxisY(): number {
        return this.axisY;
    }

    getAxisZ(): number {
        return this.axisZ;
    }

    setAxisX(x: number): void {
        this.axisX = x;
    }

    setAxisY(y: number): void {
        this.axisY = y;
    }

    setAxisZ(z: number): void {
        this.axisZ = z;
    }
}