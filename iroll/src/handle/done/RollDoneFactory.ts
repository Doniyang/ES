import RollDone from "./RollDone";

export default class RollDoneFactory{
    static instance: RollDone;
    static getInstance():RollDone{
        if(this.instance instanceof RollDone){ return this.instance  }
        return this.instance = new RollDone()
    }
}