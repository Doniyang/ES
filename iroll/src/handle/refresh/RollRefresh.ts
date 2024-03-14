import { State } from "../../shared";

export default class RollRefresh implements Digitalizer{
    private timeId: number
    
    constructor(){
        this.timeId = 0
    }

    attain(state: number): boolean {
        return state === State.None
    }
    execute(e: Event, scope: Scope, platform: Platform): void {
        
        scope.setState(State.None)

        platform.trigger('refresh')
        
        if (scope.isOutBoundary()) {
            platform.reset()
        }
    }
    
}