import Transition from "../Transition";

export default class TBackone implements Transition {
    style(): string {
        return 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    }

}