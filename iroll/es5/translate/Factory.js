import Deviation from "./deviation/Deviation";
import Transform from "./transform/Transform";
import Transition from "./transition/Transition";
import Animation from './animation/Animation';
export default class Factory {
    constructor(notify) {
        this.useTransition = true;
        this.useTransform = true;
        this.HWCompositing = true;
        this.notify = notify;
    }
    roll() {
        return this.useTransform ? new Transform(this.HWCompositing) : new Deviation();
    }
    setUseTransition(useTransition) {
        this.useTransition = useTransition;
    }
    setUseTransform(useTransform) {
        this.useTransform = useTransform;
    }
    setHWCompositing(HWCompositing) {
        this.HWCompositing = HWCompositing;
    }
    build(scope) {
        return this.useTransition ? new Transition(scope, this.roll()) : new Animation(scope, this.roll(), this.notify);
    }
}
