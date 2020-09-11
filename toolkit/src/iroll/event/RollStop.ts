import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../RollProxy";

export default class RollStop implements EventDigitalizer {
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
             
    }
    attainState(state: number): boolean {
        return state === 2;
    }

}