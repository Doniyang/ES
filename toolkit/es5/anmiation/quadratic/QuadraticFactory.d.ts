import Factory from "../Factory";
export default class QuadraticFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
