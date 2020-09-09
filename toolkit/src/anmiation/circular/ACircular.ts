import Animation from "../Animation";

export default class ACircular implements Animation {
    algorithm(k: number): number {
        return Math.sqrt(1 - (--k * k))
    }

}