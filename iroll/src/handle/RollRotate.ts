import Attribute from "../attribute/Attribute";
import Scope from "../scope/Scope";
import RollProxy from "../translate/RollProxy";
import Digitalizer from "./Digitalizer";

export default class RollRotate implements Digitalizer {
    private tId: number
    readonly delay: number

    constructor() {
        this.tId = 0;
        this.delay = 400
    }

    private isSupport(key: string, data: WheelEvent) {
        return key in data;
    }

    private isOriginState() {
        return this.tId === 0
    }

    private median(a: number, b: number, c: number): number {
        if (b > a) {
            b = a
        } else if (b < c) {
            b = c
        }
        return b
    }

    private calculate(delta: number, rate: number, speed: number): number {
        return delta / rate * speed
    }

    attain(state: number): boolean {
        return state === 0;
    }

    execute(e: WheelEvent, attrs: Attribute, proxy: RollProxy): void {
        let deltaX: number, deltaY: number, newX: number, newY: number;
        const that = this, scope: Scope = proxy.getScope(), pos: ScrollKit.Point = scope.getPosition();

        if (this.isOriginState()) {
            proxy.trigger('scroll:start', proxy.getPosition());
        }

        // Execute the scrollEnd event after 400ms the wheel stopped scrolling
        clearTimeout(this.tId);
        this.tId = setTimeout(function () {
            proxy.trigger('scroll:end', proxy.getPosition());
            that.tId = 0;
        }, this.delay);

        if (this.isSupport('deltaX', e)) {
            if (e.deltaMode === 1) {
                deltaX = this.calculate(-e.deltaX, 1, scope.getMouseWheelSpeed());
                deltaY = this.calculate(-e.deltaY, 1, scope.getMouseWheelSpeed());
            } else {
                deltaX = -e.deltaX;
                deltaY = -e.deltaY;
            }
        } else if (this.isSupport('wheelDeltaX', e)) {
            deltaX = this.calculate((e as any).wheelDeltaX, 120, scope.getMouseWheelSpeed());
            deltaY = this.calculate((e as any).wheelDeltaY, 120, scope.getMouseWheelSpeed());
        } else if (this.isSupport('wheelDelta', e)) {
            deltaX = deltaY = this.calculate((e as any).wheelDelta, 120, scope.getMouseWheelSpeed())
        } else if (this.isSupport('detail', e)) {
            deltaX = deltaY = this.calculate(-e.detail, 3, scope.getMouseWheelSpeed());
        } else {
            return void 0;
        }

        deltaX = this.calculate(deltaX, 1, scope.getMouseWheelDirection());
        deltaY = this.calculate(deltaY, 1, scope.getMouseWheelDirection());
        ;

        if (!scope.isVScroll()) {
            deltaY = deltaY;
            deltaY = 0;
        }


        newX = pos.x + Math.round(scope.isHScroll() ? deltaX : 0);
        newY = pos.y + Math.round(scope.isVScroll() ? deltaY : 0);

        scope.setScrollDirection(deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0, deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0)


        newX = this.median(0, newX, scope.getMaxDistance().x)
        newY = this.median(0, newY, scope.getMaxDistance().y)

        proxy.scrollTo(newX, newY, 0, proxy.getAnimation());
    }

}
