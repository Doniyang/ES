import TEaseOutQuart from "./TEaseOutQuart";
import AEaseOutQuart from "./AEaseOutQuart";
export default class EaseOutQuartFactory {
    style() {
        return (new TEaseOutQuart()).style();
    }
    algorithm(k) {
        return (new AEaseOutQuart()).algorithm(k);
    }
}
