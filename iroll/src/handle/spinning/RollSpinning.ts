import { EaseOutQuint } from "@niyang-es/toolkit";
import StopPropagationFilter from "../../filters/StopPropagationFilter";
import { State, ToolKit, Direction } from "../../shared";
import Digitalizer from "../Digitalizer";

export default class RollSpinning implements Digitalizer {
    /**
     * @name delay
     */
    private readonly delay: number
    /**
     * @name delay
     */
    private strip: boolean
    /**
     * @name regainTId
     */
    private regainTId: number
    /**
     * @name eTId
     */
    private eTId: number
    /**
     * @name propagation
     */
    private propagation: StopPropagationFilter
    constructor() {
        this.delay = 400
        this.strip = true
        this.regainTId = 0
        this.eTId = 0
        this.propagation = new StopPropagationFilter()
    }
    /**
     * @method isStrip
     * @returns 
     */  
    private isStrip():boolean{
        return this.strip
    }
    /**
     * @method setStrip
     * @param strip 
     */
    private setStrip(strip: boolean) {
        this.strip = strip
    }
    /**
     * @method regain
     * @param isActived 
     * @param pos 
     * @param platform 
     */
    private regain(isActived: boolean, pos: RollKit.Point, platform: Platform) {
        clearTimeout(this.regainTId)
        this.regainTId = setTimeout(() => {
            if (isActived) { platform.trigger('scroll:end', pos) }
            this.setStrip(true)
        }, this.delay)
    }
    /**
     * @method calculation
     * @param e 
     * @param speed 
     * @returns 
     */
    private calculation(e: WheelEvent, speed: number): RollKit.Point {
        let wheelDeltaX = 0;
        let wheelDeltaY = 0;

        switch (true) {
            case 'deltaX' in e:
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * speed;
                    wheelDeltaY = -e.deltaY * speed;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
                break;
            case 'wheelDeltaX' in e:
                wheelDeltaX = (e as any).wheelDeltaX / 120 * speed;
                wheelDeltaY = (e as any).wheelDeltaY / 120 * speed;
                break;
            case 'wheelDelta' in e:
                wheelDeltaX = wheelDeltaY = (e as any).wheelDelta / 120 * speed;
                break;
            case 'detail' in e:
                wheelDeltaX = wheelDeltaY = -(e as any).detail / 3 * speed;
                break;
            default:
                break;
        }
        return { x: wheelDeltaX, y: wheelDeltaY }
    }
    /**
     * @method attain
     * @param state 
     * @returns 
     */ 
    public attain(state: number): boolean {
        return state === State.None
    }
    /**
     * @method execute
     * @param e 
     * @param scope 
     * @param platform 
     */
    public execute(e: WheelEvent, scope: Scope, platform: Platform): void {

        e.preventDefault()
        this.propagation.attach(scope)
        this.propagation.doFilter(e)

        const pos = scope.getZeta()

        if (this.isStrip()) {
            platform.trigger('scroll:start', pos)
        }

        this.setStrip(false)

        this.regain(!scope.isSupportSnap(), pos, platform)

        const { x, y } = this.calculation(e, scope.getMouseWheelSpeed())
        const factor = scope.getMouseWheelFactor()
        let wheelDeltaX = x * factor;
        let wheelDeltaY = y * factor;
        if (!scope.isVerticalScroll()) {
            wheelDeltaX = wheelDeltaY;
            wheelDeltaY = 0;
        }
        let newX = pos.x + Math.round(scope.isHorizontalScroll() ? wheelDeltaX : 0);
        let newY = pos.y + Math.round(scope.isVerticalScroll() ? wheelDeltaY : 0);

        let directionX = ToolKit.isLessThan(0, wheelDeltaX) ? Direction.Negative : ToolKit.isLessThan(wheelDeltaX, 0) ? Direction.Positive : Direction.Zero;
        let directionY = ToolKit.isLessThan(0, wheelDeltaY) ? Direction.Negative : ToolKit.isLessThan(wheelDeltaY, 0) ? Direction.Positive : Direction.Zero;

        scope.setKappa(directionX, directionY)
        if (ToolKit.isLessThan(0, newX)) {
            newX = 0;
        } else if (ToolKit.isLessThan(newX, scope.getMaxScrollX())) {
            newX = scope.getMaxScrollX();
        }

        if (ToolKit.isLessThan(0, newY)) {
            newY = 0;
        } else if (ToolKit.isLessThan(newY, scope.getMaxScrollY())) {
            newY = scope.getMaxScrollY();
        }
        const easeTime = scope.getMouseWheelTime()

        platform.scrollTo(newX, newY, easeTime, new EaseOutQuint());
        platform.trigger('scroll', pos);
        clearTimeout(this.eTId);
        if (pos.y === newY) {
            this.eTId = setTimeout(() => {
                platform.trigger('scrollEnd', pos)
            }, easeTime)
        }
    }

}