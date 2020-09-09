import Factory from "../Factory";
import TElastic from "./TElastic";
import AElastic from "./AElastic";

export default class ElasticFactory implements Factory {
    style(): string {
        return (new TElastic()).style();
    }
    algorithm(k: number): number {
        return (new AElastic()).algorithm(k);
    }

}