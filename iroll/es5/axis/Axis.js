export default class Axis {
    constructor() {
        this.axisX = 0;
        this.axisY = 0;
        this.axisZ = 0;
    }
    getAxisX() {
        return this.axisX;
    }
    getAxisY() {
        return this.axisY;
    }
    getAxisZ() {
        return this.axisZ;
    }
    setAxisX(x) {
        this.axisX = x;
    }
    setAxisY(y) {
        this.axisY = y;
    }
    setAxisZ(z) {
        this.axisZ = z;
    }
}
