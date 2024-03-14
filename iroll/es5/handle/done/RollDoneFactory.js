import RollDone from "./RollDone";
export default class RollDoneFactory {
    static getInstance() {
        if (this.instance instanceof RollDone) {
            return this.instance;
        }
        return this.instance = new RollDone();
    }
}
