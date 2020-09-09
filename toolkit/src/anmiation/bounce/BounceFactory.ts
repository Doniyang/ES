import Factory from "../Factory";
import TBackone from "../backone/TBackone";
import ABounce from "./ABounce";

export default class BounceFactory implements Factory {
    style(): string {
        return (new TBackone()).style();
    }
    algorithm(k: number): number {
        return (new ABounce()).algorithm(k)
    }

}