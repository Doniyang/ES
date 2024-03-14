import { EaseOutQuint } from "@niyang-es/toolkit";
import StopPropagationFilter from "../../filters/StopPropagationFilter";
import { ToolKit } from "../../shared";
export default class RollSpinning {
    constructor() {
        this.delay = 400;
        this.strip = true;
        this.regainTId = 0;
        this.eTId = 0;
        this.propagation = new StopPropagationFilter();
    }
    isStrip() {
        return this.strip;
    }
    setStrip(strip) {
        this.strip = strip;
    }
    regain(isActived, pos, platform) {
        clearTimeout(this.regainTId);
        this.regainTId = setTimeout(() => {
            if (isActived) {
                platform.trigger('scroll:end', pos);
            }
            this.setStrip(true);
        }, this.delay);
    }
    calculation(e, speed) {
        let wheelDeltaX = 0;
        let wheelDeltaY = 0;
        switch (true) {
            case 'deltaX' in e:
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * speed;
                    wheelDeltaY = -e.deltaY * speed;
                }
                else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
                break;
            case 'wheelDeltaX' in e:
                wheelDeltaX = e.wheelDeltaX / 120 * speed;
                wheelDeltaY = e.wheelDeltaY / 120 * speed;
                break;
            case 'wheelDelta' in e:
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed;
                break;
            case 'detail' in e:
                wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed;
                break;
            default:
                break;
        }
        return { x: wheelDeltaX, y: wheelDeltaY };
    }
    attain(state) {
        return state === 0;
    }
    execute(e, scope, platform) {
        e.preventDefault();
        this.propagation.attach(scope);
        this.propagation.doFilter(e);
        const pos = scope.getZeta();
        if (this.isStrip()) {
            platform.trigger('scroll:start', pos);
        }
        this.setStrip(false);
        this.regain(!scope.isSupportSnap(), pos, platform);
        const { x, y } = this.calculation(e, scope.getMouseWheelSpeed());
        const factor = scope.getMouseWheelFactor();
        let wheelDeltaX = x * factor;
        let wheelDeltaY = y * factor;
        if (!scope.isVerticalScroll()) {
            wheelDeltaX = wheelDeltaY;
            wheelDeltaY = 0;
        }
        let newX = pos.x + Math.round(scope.isHorizontalScroll() ? wheelDeltaX : 0);
        let newY = pos.y + Math.round(scope.isVerticalScroll() ? wheelDeltaY : 0);
        let directionX = ToolKit.isLessThan(0, wheelDeltaX) ? -1 : ToolKit.isLessThan(wheelDeltaX, 0) ? 1 : 0;
        let directionY = ToolKit.isLessThan(0, wheelDeltaY) ? -1 : ToolKit.isLessThan(wheelDeltaY, 0) ? 1 : 0;
        scope.setKappa(directionX, directionY);
        if (ToolKit.isLessThan(0, newX)) {
            newX = 0;
        }
        else if (ToolKit.isLessThan(newX, scope.getMaxScrollX())) {
            newX = scope.getMaxScrollX();
        }
        if (ToolKit.isLessThan(0, newY)) {
            newY = 0;
        }
        else if (ToolKit.isLessThan(newY, scope.getMaxScrollY())) {
            newY = scope.getMaxScrollY();
        }
        const easeTime = scope.getMouseWheelTime();
        platform.scrollTo(newX, newY, easeTime, new EaseOutQuint());
        platform.trigger('scroll', pos);
        clearTimeout(this.eTId);
        if (pos.y === newY) {
            this.eTId = setTimeout(() => {
                platform.trigger('scrollEnd', pos);
            }, easeTime);
        }
    }
}
