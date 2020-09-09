import Animation from "../Animation";

export default class AQuadratic implements Animation {
    algorithm(k: number): number {
        return k * (2 - k)
    }

}