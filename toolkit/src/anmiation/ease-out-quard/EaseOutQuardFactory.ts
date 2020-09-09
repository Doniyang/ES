import Factory from "../Factory";
import TEaseOutQuard from "./TEaseOutQuard";
import AEaseOutQuard from "./AEaseOutQuard";

export default class EaseOutQuardFactory implements Factory {
    style(): string {
        return (new TEaseOutQuard()).style();
    }
    algorithm(k: number): number {
        return (new AEaseOutQuard()).algorithm(k);
    }

} 
