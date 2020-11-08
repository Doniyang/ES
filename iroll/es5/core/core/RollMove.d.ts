import EventDigitalizer from "../EventDigitalizer";
import Attribute from "../attribute/Attribute";
import RollProxy from "../RollProxy";
export default class RollMove implements EventDigitalizer {
    constructor();
    private isIarge;
    private isPlenty;
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void;
}
