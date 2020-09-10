import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../RollProxy";
import Scope from "../scope/Scope";
import Factory from "../../anmiation/Factory";
import EaseOutQuartFactory from "../../anmiation/ease-out-quart/EaseOutQuartFactory";
import RollFactory from "./RollFactory";

export default class RollStart implements EventDigitalizer {
  private preventDefault: boolean;
  private scrollElement: HTMLElement;
  private scope: Scope;
  private HWCompositing: boolean;
  private animation: Factory
  constructor(el: HTMLElement, scope: Scope) {
    this.scrollElement = el;
    this.scope = scope
    this.preventDefault = false
    this.HWCompositing = true
    this.animation = new EaseOutQuartFactory()
  }

  setPreventDefault(preventDefault: boolean) {
    this.preventDefault = preventDefault
  }

  isPreventDefault(): boolean {
    return this.preventDefault
  }
  setHWCompositing(isCompositing: boolean) {
    this.HWCompositing = isCompositing
  }
  setAnimation(animation: Factory) {
    this.animation = animation
  }

  private isTouchEvent(e: Event): e is TouchEvent {
    return 'touches' in e
  }

  execute(e: MouseEvent|TouchEvent, attrs: Attribute, proxy: RollProxy): void {
    let point = this.isTouchEvent(e) ? e.touches[0] : e, pos;
    if (this.isPreventDefault()) {
      e.preventDefault();
    }
    if (proxy.disabled) {
      proxy.build((new RollFactory(attrs.getMode())).strategy(this.scrollElement, this.scope, this.animation, this.HWCompositing));
    }

    attrs.setDelta(0, 0);
    attrs.setDirection(0, 0);
    attrs.setLock(0);
    attrs.setStartTime(Date.now());

    proxy.stop();

    pos = proxy.getPosition();

    attrs.setStart(pos.x, pos.y);
    attrs.setAbsStart(pos.x, pos.y);
    attrs.setPoint(point.pageX, point.pageY);
    attrs.setState(1);
    proxy.trigger('scroll:bofore', pos);

  }

  attainState(state: number): boolean {
    return state === 0
  }
}