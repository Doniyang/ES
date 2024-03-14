import Feature from "../Feature";
export default class MouseeWheel extends Feature {
    constructor() {
        super(false);
        this.speed = 20;
        this.invert = false;
        this.time = 300;
    }
    getSpeed() {
        return this.speed;
    }
    getFactor() {
        return this.invert ? -1 : 1;
    }
    getTime() {
        return this.time;
    }
}
