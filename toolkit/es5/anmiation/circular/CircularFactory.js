import TCircular from "./TCircular";
import ACircular from "./ACircular";
export default class CircularFactory {
    style() {
        return (new TCircular()).style();
    }
    algorithm(k) {
        return (new ACircular()).algorithm(k);
    }
}
