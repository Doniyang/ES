import TBackone from "./TBackone";
import ABackone from "./ABackone";
export default class BackoneFactory {
    style() {
        return (new TBackone()).style();
    }
    algorithm(k) {
        return (new ABackone()).algorithm(k);
    }
}
