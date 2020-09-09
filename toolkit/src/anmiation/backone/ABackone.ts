import Animation from "../Animation";

export default class ABackone implements Animation {
    algorithm(k: number): number {
        let b: number = 4;
        return (k = k - 1) * k * ((b + 1) * k + b) + 1;
    }

}