import Transition from "../Transition";

export default class TCircular implements Transition {
    style(): string {
        return 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    }
    
}