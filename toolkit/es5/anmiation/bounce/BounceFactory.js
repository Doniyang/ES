import TBackone from "../backone/TBackone";
import ABounce from "./ABounce";
export default class BounceFactory {
    style() {
        return (new TBackone()).style();
    }
    algorithm(k) {
        return (new ABounce()).algorithm(k);
    }
}
