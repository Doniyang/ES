import Factory from "../Factory";
export default class BounceFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
