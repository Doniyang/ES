import Animation from "../Animation";

export default class AEaseOutQuart implements Animation {
    algorithm(t: number): number {
        return 1 - (--t * t * t * t)
    }

}