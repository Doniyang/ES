import RollStart from "./RollStart"
export default class RollStartFactory{
    static instance: RollStart;
    static getInstance():RollStart{
        if(this.instance instanceof RollStart){ return this.instance  }
        return this.instance = new RollStart()
    }
}