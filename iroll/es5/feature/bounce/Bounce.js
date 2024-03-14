import Feature from "../Feature";
export default class Bounce extends Feature {
    constructor() {
        super(true);
        this.time = 800;
    }
    getTime() {
        return this.time;
    }
}
