import { PrefixStyle } from "@niyang-es/toolkit";
import Deviate from "./translate/Deviate";
import Translate from "./translate/Translate";
import Transition from "./animate/Transition";
import AnimationJS from './animate/Animation';
export default class Factory {
    constructor() {
        this.useTransition = true;
        this.useTransform = true;
        this.HWCompositing = true;
    }
    isSupportTransform() {
        return this.useTransform && (PrefixStyle.has(PrefixStyle.jsStyle('transform')) || PrefixStyle.has('transform'));
    }
    isSupportTransition() {
        return this.useTransition && (PrefixStyle.has(PrefixStyle.jsStyle('transition')) || PrefixStyle.has('transition'));
    }
    isSupportCompositing() {
        return this.HWCompositing && (PrefixStyle.has(PrefixStyle.jsStyle('perspective')) || PrefixStyle.has('perspective'));
    }
    roll() {
        return this.isSupportTransform() ? new Translate(this.isSupportCompositing()) : new Deviate();
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
    build(scope, notify) {
        return this.isSupportTransition() ? new Transition(scope, this.roll()) : new AnimationJS(scope, this.roll(), notify);
    }
}
