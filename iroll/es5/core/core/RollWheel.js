export default class RollWheel {
    constructor() {
        this.tId = 0;
    }
    isReady() {
        return this.tId === 0;
    }
    calculate(e, speed) {
        let delta = { x: Infinity, y: Infinity };
        return delta;
    }
    execute(e, attrs, proxy) {
        let deltaX, deltaY, newX, newY;
        const that = this;
    }
}
