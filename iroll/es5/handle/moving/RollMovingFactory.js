import RollMoving from "./RollMoving";
export default class RollMovingFactory {
    static getInstance() {
        if (this.instance instanceof RollMoving) {
            return this.instance;
        }
        return this.instance = new RollMoving();
    }
}
