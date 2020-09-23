import Factory from "../Factory";
export default class BackoneFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
