import TQuadratic from "./TQuadratic";
import AQuadratic from "./AQuadratic";
export default class QuadraticFactory {
    style() {
        return (new TQuadratic()).style();
    }
    algorithm(k) {
        return (new AQuadratic()).algorithm(k);
    }
}
