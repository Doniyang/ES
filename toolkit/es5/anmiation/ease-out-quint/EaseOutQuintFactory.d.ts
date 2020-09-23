import Factory from "../Factory";
export default class EaseOutQuintFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
