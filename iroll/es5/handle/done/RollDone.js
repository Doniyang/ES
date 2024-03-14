import { DomKit } from "../../shared";
export default class RollDone {
    constructor() {
    }
    attain(state) {
        return [2, 3].includes(state);
    }
    execute(e, scope, platform) {
        if (!DomKit.isSameElement(e.target, scope.getRollElement()) && scope.getStatus() !== 1) {
            return void 0;
        }
        platform.stop();
        if (scope.isOutBoundary()) {
            platform.reset();
        }
        else {
            scope.setStatus(0);
            if (scope.getProbeType() !== 3) {
                platform.trigger('scroll:end', scope.getZeta());
            }
        }
    }
}
