import Animation from "../Animation";

export default class AEaseOutQuard implements Animation {
    algorithm(t: number): number {
        return t * (2 - t)
    }

}