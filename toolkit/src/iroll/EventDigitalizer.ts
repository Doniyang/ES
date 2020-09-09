import RollProxy from "./RollProxy";
import Attribute from "./attribute/Attribute";

export default interface EventDigitalizer{
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void
    attainState(state: number): boolean
}