import Factory from "../Factory";
import TBackone from "./TBackone";
import ABackone from "./ABackone";

export default class BackoneFactory implements Factory {
    style(): string {
        return (new TBackone()).style()
    }
    algorithm(k: number): number {
        return (new ABackone()).algorithm(k);
    }

}