import { State } from "../../shared";

export default class RollRefresh implements Digitalizer {
    /**
     * @name timeId
     */
    private timeId: number

    constructor() {
        this.timeId = 0
    }
    /**
     * @method attain
     * @param state 
     * @returns 
     */  
    public attain(state: number): boolean {
        return state === State.None
    }
    /**
     * @method execute
     * @param e 
     * @param scope 
     * @param platform 
     */
    public execute(e: Event, scope: Scope, platform: Platform): void {

        scope.setState(State.None)

        platform.trigger('refresh')
        if(this.timeId) clearTimeout(this.timeId)   
        this.timeId = setTimeout(()=>{
           platform.reset()
        },scope.getResizePolling())
    }
}