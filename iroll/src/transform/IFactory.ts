import Notify from "../notify/Notify";
import Scope from "../scope/Scope";
export default interface IFactory<T>{
  setUseTransition(useTransition: boolean): void

  setUseTransform(useTransform: boolean):void

  setHWCompositing(HWCompositing: boolean):void
     
   build(scope:Scope,notify:Notify):T;
}