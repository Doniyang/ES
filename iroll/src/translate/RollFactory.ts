import Scope from "../scope/Scope";
import Deviation from "./deviation/Deviation";
import Transform from "./transform/Transform";
import Transition from "./transition/Transition";
import Animation from './animation/Animation'
import Variate from "./Variate";
import Notify from "../notify/Notify";

export default class RollFactory {
    private useTransition: boolean;

    private useTransform: boolean;

    private HWCompositing: boolean;

    private probe: number;

    private notify: Notify;

    constructor(notify: Notify) {
        this.useTransition = true
        this.useTransform = true
        this.HWCompositing = true
        this.probe = 1;
        this.notify = notify
    }

    setProbe(probe: number) {
        this.probe = probe
    }

    getProbe(): number {
        return this.probe
    }

    setUseTransition(useTransition: boolean): void {
        this.useTransition = useTransition
    }
    setUseTransform(useTransform: boolean) {
        this.useTransform = useTransform
    }

    setHWCompositing(HWCompositing: boolean) {
        this.HWCompositing = HWCompositing
    }

    build(scope: Scope) {
        return this.useTransition ? new Transition(scope, this.buildRoll()) : new Animation(scope, this.buildRoll(), this.notify, this.probe)
    }

    buildRoll(): Variate {
        return this.useTransform ? new Transform(this.HWCompositing) : new Deviation()
    }
}