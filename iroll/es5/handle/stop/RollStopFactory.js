import RollStop from "./RollStop";
export default class RollStopFactory {
    static getInstance() {
        if (this.instance instanceof RollStop) {
            return this.instance;
        }
        return this.instance = new RollStop();
    }
}
