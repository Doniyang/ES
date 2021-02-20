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

    private notify: Notify;

    constructor(notify: Notify) {
        this.useTransition = true
        this.useTransform = true
        this.HWCompositing = true
        this.notify = notify
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
        return this.useTransition ? new Transition(scope, this.roll()) : new Animation(scope, this.roll(), this.notify)
    }

    roll(): Variate {
        return this.useTransform ? new Transform(this.HWCompositing) : new Deviation()
    }
}