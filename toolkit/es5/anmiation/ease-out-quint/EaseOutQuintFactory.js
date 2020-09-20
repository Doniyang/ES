import { TEaseOutQuint } from "./TEaseOutQuint";
import AEaseOutQuint from "./AEaseOutQuint";
export default class EaseOutQuintFactory {
    style() {
        return (new TEaseOutQuint()).style();
    }
    algorithm(k) {
        return (new AEaseOutQuint()).algorithm(k);
    }
}
