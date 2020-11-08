import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../RollProxy";
export default class RollFinish implements EventDigitalizer {
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void;
}
