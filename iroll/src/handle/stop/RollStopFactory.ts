import RollStop from "./RollStop";

export default class RollStopFactory{
    static instance: RollStop;
    static getInstance():RollStop{
        if(this.instance instanceof RollStop){ return this.instance  }
        return this.instance = new RollStop()
    }
}