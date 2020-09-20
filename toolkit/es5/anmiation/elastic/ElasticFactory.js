import TElastic from "./TElastic";
import AElastic from "./AElastic";
export default class ElasticFactory {
    style() {
        return (new TElastic()).style();
    }
    algorithm(k) {
        return (new AElastic()).algorithm(k);
    }
}
