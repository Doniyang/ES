import RollRefresh from "./RollRefresh";
export default class RollRefreshFactory {
    static getInstance() {
        if (this.instance instanceof RollRefresh) {
            return this.instance;
        }
        return this.instance = new RollRefresh();
    }
}
