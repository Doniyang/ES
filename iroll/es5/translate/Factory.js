import { PrefixStyle } from "@niyang-es/toolkit";
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
    isSupportTransform() {
        return (PrefixStyle.has(PrefixStyle.jsStyle('transform')) || PrefixStyle.has('transform')) && this.useTransform;
    }
    isSupportTransition() {
        return (PrefixStyle.has(PrefixStyle.jsStyle('transition')) || PrefixStyle.has('transition')) && this.useTransition;
    }
    vialog() {
        return this.isSupportTransform() ? new Transform(this.HWCompositing) : new Deviation();
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
        return this.isSupportTransition() ? new Transition(scope, this.vialog()) : new Animation(scope, this.vialog(), this.notify);
    }
}
