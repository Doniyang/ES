import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollDigitalizer from "../RollDigitalizer";

export default class TouchStart implements EventDigitalizer {
  private preventDefault: boolean;

  constructor() {
    this.preventDefault = false
  }

  setPreventDefault(preventDefault: boolean) {
    this.preventDefault = preventDefault
  }

  isPreventDefault(): boolean {
    return this.preventDefault
  }
  execute(e: Event, attrs: Attribute, strategy: RollDigitalizer): void {
    if(this.isPreventDefault()){
      e.preventDefault();
    }
    attrs.setDelta(0,0);
    attrs.setDirection(0,0);
    attrs.setStartTime(Date.now());
    if(strategy.getState()===1){

    }
    if(strategy.getState()===3){

    }


  }

  attainState(state: number): boolean {
    return state === 0
  }
}