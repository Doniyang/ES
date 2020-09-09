import Transition from "../Transition";

export default class TEaseOutQuart implements Transition {
    style(): string {
        return 'cubic-bezier(0.165, 0.84, 0.44, 1)';
    }

}