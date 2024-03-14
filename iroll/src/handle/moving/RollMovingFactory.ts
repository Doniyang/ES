import RollMoving from "./RollMoving";

export default class RollMovingFactory{
    static instance: RollMoving;
    static getInstance():RollMoving{
        if(this.instance instanceof RollMoving){ return this.instance  }
        return this.instance = new RollMoving()
    }
}