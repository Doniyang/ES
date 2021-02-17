import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../../translate/RollProxy";

export default class RollRefresh implements EventDigitalizer {
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
        attrs.setEndTime(0);
        attrs.setDirection(0, 0);
        if (!proxy.isPeak()) {
            proxy.resetPosition()
        }
    }
}