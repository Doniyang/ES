import Transition from "../Transition"

export default class TQuadratic implements Transition {
    style(): string {
        return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

}