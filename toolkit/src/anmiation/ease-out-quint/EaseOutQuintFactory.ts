import Factory from "../Factory";
import { TEaseOutQuint } from "./TEaseOutQuint";
import AEaseOutQuint from "./AEaseOutQuint";

export default class EaseOutQuintFactory implements Factory {
    style(): string {
        return (new TEaseOutQuint()).style();
    }
    algorithm(k: number): number {
        return (new AEaseOutQuint()).algorithm(k);
    }

}