import Factory from "../Factory";
export default class EaseOutQuardFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
