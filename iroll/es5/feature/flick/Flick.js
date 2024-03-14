import Feature from "../Feature";
export default class Flick extends Feature {
    constructor() {
        super(true);
        this.time = 200;
        this.distance = 100;
    }
    getTime() {
        return this.time;
    }
    getDistance() {
        return this.distance;
    }
}
