import Factory from "../Factory";
import TQuadratic from "./TQuadratic";
import AQuadratic from "./AQuadratic";

export default class QuadraticFactory implements Factory {
    style(): string {
        return (new TQuadratic()).style();
    }
    algorithm(k: number): number {
        return (new AQuadratic()).algorithm(k);
    }

}