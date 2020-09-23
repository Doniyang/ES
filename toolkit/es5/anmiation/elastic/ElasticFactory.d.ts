import Factory from "../Factory";
export default class ElasticFactory implements Factory {
    style(): string;
    algorithm(k: number): number;
}
