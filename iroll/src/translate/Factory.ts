import {PrefixStyle} from "@niyang-es/toolkit";
import Scope from "../scope/Scope";
import Deviation from "./deviation/Deviation";
import Transform from "./transform/Transform";
import Transition from "./transition/Transition";
import Animation from './animation/Animation';
import Vialog from "./Vialog";
import Notify from "../notify/Notify";
import RollDigitalizer from "./RollDigitalizer";

export default class Factory {
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
    
    private isSupportTransform():boolean{
        return (PrefixStyle.has(PrefixStyle.jsStyle('transform')) ||PrefixStyle.has('transform')) && this.useTransform;
    }

    private isSupportTransition():boolean{
        return (PrefixStyle.has(PrefixStyle.jsStyle('transition'))||PrefixStyle.has('transition')) && this.useTransition;
    }

    private vialog(): Vialog {
        return this.isSupportTransform() ? new Transform(this.HWCompositing) : new Deviation()
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

    build(scope: Scope): RollDigitalizer {
        return this.isSupportTransition() ? new Transition(scope, this.vialog()) : new Animation(scope, this.vialog(), this.notify)
    }
}
