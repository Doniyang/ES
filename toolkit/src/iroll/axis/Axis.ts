/**
 * 坐标类
 * author   niyang
 */
export default class Axis {
    private axisX: number;
    private axisY: number;
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