import Factory from "../Factory";
import TCircular from "./TCircular";
import ACircular from "./ACircular";

export default class CircularFactory implements Factory {
    style(): string {
        return (new TCircular()).style();
    }
    algorithm(k: number): number {
        return (new ACircular()).algorithm(k);
    }

}