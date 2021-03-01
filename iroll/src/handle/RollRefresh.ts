import Scope from "../scope/Scope";
import Attribute from "../attribute/Attribute";
import Digitalizer from "./Digitalizer";
import RollProxy from "../translate/RollProxy";

export default class RollRefresh implements Digitalizer {
    constructor(){}
    private isOutBoundary(prev: ScrollKit.Point, next: ScrollKit.Point) {
        return !(prev.x === next.x && prev.y === next.y)
      }
    attain(state: number): boolean {
       return state === 0;
    }
    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
        const scope:Scope = proxy.getScope()
        attrs.setEndTime(0);
        scope.setScrollDirection(0, 0);

        proxy.trigger('refresh')

        if (this.isOutBoundary(proxy.getPosition(),scope.getCrisisPosition())) {
            proxy.resetPosition()
        }
    }
}