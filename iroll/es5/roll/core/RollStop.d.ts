import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../RollProxy";
export default class RollStop implements EventDigitalizer {
    private momentum;
    private isLarge;
    private isunven;
    execute(e: MouseEvent | TouchEvent, attrs: Attribute, proxy: RollProxy): void;
}
