import Feature from "../Feature";
export default class Swipe extends Feature {
    constructor() {
        super(true);
        this.time = 2500;
        this.bounce = 500;
    }
}
