import RollRefresh from "./RollRefresh";

export default class RollRefreshFactory{
    static instance: RollRefresh;
    static getInstance():RollRefresh{
        if(this.instance instanceof RollRefresh){ return this.instance  }
        return this.instance = new RollRefresh()
    }
}