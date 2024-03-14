import RollSpinning from "./RollSpinning";
export default class RollSpinningFactory {
    static getInstance() {
        if (this.instance instanceof RollSpinning) {
            return this.instance;
        }
        return this.instance = new RollSpinning();
    }
}
