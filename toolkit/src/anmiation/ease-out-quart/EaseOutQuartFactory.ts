import Factory from "../Factory";
import TEaseOutQuart from "./TEaseOutQuart";
import AEaseOutQuart from "./AEaseOutQuart";

export default class EaseOutQuartFactory implements Factory{
    style(): string {
       return (new TEaseOutQuart()).style();
    }
    algorithm(k: number): number {
       return (new AEaseOutQuart()).algorithm(k);
    }
    
}