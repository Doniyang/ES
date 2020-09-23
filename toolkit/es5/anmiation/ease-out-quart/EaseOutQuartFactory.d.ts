import Factory from "../Factory";
export default class EaseOutQuartFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
