import Animation from "../Animation";

export default class AEaseOutQuint implements Animation {
    algorithm(t: number): number {
        return 1 + (--t * t * t * t * t);
    }

}