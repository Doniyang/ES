import RollSpinning from "./RollSpinning";

export default class RollSpinningFactory{
    static instance: RollSpinning;
    static getInstance():RollSpinning{
        if(this.instance instanceof RollSpinning){ return this.instance  }
        return this.instance = new RollSpinning()
    }
}