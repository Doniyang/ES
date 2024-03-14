import RollStart from "./RollStart";
export default class RollStartFactory {
    static getInstance() {
        if (this.instance instanceof RollStart) {
            return this.instance;
        }
        return this.instance = new RollStart();
    }
}
