import Scope from "../scope/Scope";
import Attribute from "../attribute/Attribute";
import RollProxy from "../translate/RollProxy";
import Digitalizer from "./Digitalizer";

export default class RollClose implements Digitalizer {

    private isOutBoundary(prev: ScrollKit.Point, next: ScrollKit.Point) {
        return !(prev.x === next.x && prev.y === next.y)
    }

    private isSameElement(el: Element, ol: HTMLElement) {
        return el.isSameNode(ol)
    }

    attain(state: number): boolean {
        return state === 0;
    }

    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
        const scope: Scope = proxy.getScope()
        if (!this.isSameElement(e.target as Element, scope.getScrollElement()) && proxy.getState() === 1) {
            return void 0;
        }
        proxy.stop();

        if (this.isOutBoundary(proxy.getPosition(), scope.getCrisisPosition())) {
            proxy.resetPosition()

        } else {
            proxy.setState(0)
            proxy.trigger('scroll:end', proxy.getPosition())
        }

    }
}
