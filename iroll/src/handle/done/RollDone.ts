import { DomKit, Probe, State, Status } from "../../shared";
import Digitalizer from "../Digitalizer";

export default class RollDone implements Digitalizer {

    constructor() { }
    /**
     * @method attain
     * @param state 
     * @returns 
     */
    public attain(state: number): boolean {
        return State.None === state
    }
    /**
     * @method execute
     * @param e 
     * @param scope 
     * @param platform 
     * @returns 
     */  
    public execute(e: Event, scope: Scope, platform: Platform): void {
        if (!DomKit.isSameElement(e.target as any, scope.getRollElement()) && scope.getStatus() !== Status.Transiting) {
            return void 0;
        }

        platform.stop()

        if (scope.isOutBoundary()) {
            platform.reset()
        } else {
            scope.setStatus(Status.None)
            if (scope.getProbeType() !== Probe.Realtime) {
                platform.trigger('scroll:end', scope.getZeta())
            }
        }

    }

}