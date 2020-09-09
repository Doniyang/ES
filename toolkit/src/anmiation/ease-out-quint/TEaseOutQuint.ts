import Transition from "../Transition";

export class TEaseOutQuint implements Transition{
    style(): string {
      return 'cubic-bezier(0.23, 1, 0.32, 1)';
    }
    
}