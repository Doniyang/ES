import TEaseOutQuard from "./TEaseOutQuard";
import AEaseOutQuard from "./AEaseOutQuard";
export default class EaseOutQuardFactory {
    style() {
        return (new TEaseOutQuard()).style();
    }
    algorithm(k) {
        return (new AEaseOutQuard()).algorithm(k);
    }
}
