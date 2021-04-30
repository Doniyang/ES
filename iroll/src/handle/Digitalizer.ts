import RollProxy from "../translate/RollProxy";
import Attribute from "../attribute/Attribute";

/**
 * @description
 */
export default interface Digitalizer {
    attain(state: number): boolean;

    execute(e: Event, attrs: Attribute, proxy: RollProxy): void
}
