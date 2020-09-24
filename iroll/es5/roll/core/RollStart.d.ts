import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../RollProxy";
export default class RollStart implements EventDigitalizer {
    constructor();
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void;
}
