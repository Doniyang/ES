import { PrefixStyle } from "@niyang-es/toolkit";
import Notify from "../notify/Notify";
import Scope from "../scope/Scope";
import Digitalizer from "./animate/Digitalizer";
import RollDigitalizer from "./translate/Digitalizer";
import Deviate from "./translate/Deviate";
import Translate from "./translate/Translate";
import IFactory from "./IFactory";
import Transition from "./animate/Transition";
import AnimationJS from './animate/Animation'
export default class Factory implements IFactory<Digitalizer> {
  private useTransition: boolean;

  private useTransform: boolean;

  private HWCompositing: boolean;

  constructor() {
    this.useTransition = true
    this.useTransform = true
    this.HWCompositing = true
  }

  private isSupportTransform(): boolean {
    return this.useTransform && (PrefixStyle.has(PrefixStyle.jsStyle('transform')) || PrefixStyle.has('transform'))
  }

  private isSupportTransition(): boolean {
    return this.useTransition && (PrefixStyle.has(PrefixStyle.jsStyle('transition')) || PrefixStyle.has('transition'))
  }

  private isSupportCompositing(): boolean {
    return this.HWCompositing && (PrefixStyle.has(PrefixStyle.jsStyle('perspective')) || PrefixStyle.has('perspective'))
  }
  
  private roll():RollDigitalizer{
     return this.isSupportTransform()?new Translate(this.isSupportCompositing()):new  Deviate()
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
     
   build(scope:Scope,notify:Notify):Digitalizer{
    return this.isSupportTransition()? new Transition(scope,this.roll()):new AnimationJS(scope,this.roll(),notify);
   }
}