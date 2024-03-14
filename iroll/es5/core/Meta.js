import { PrefixStyle } from '@niyang-es/toolkit';
import MouseeWheel from "../feature/mouse/MouseeWheel";
import Momentum from "../feature/momentum/Momentum";
import Swipe from "../feature/swipe/Swipe";
import Flick from "../feature/flick/Flick";
import Bounce from "../feature/bounce/Bounce";
import Prevent from "../feature/prevent/Prevent";
export default class Meta {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.scrollX = false;
        this.scrollY = true;
        this.directionLockThreshold = 5;
        this.eventPassthrough = "none";
        this.click = false;
        this.tap = false;
        this.bounce = new Bounce();
        this.momentum = new Momentum();
        this.swipe = new Swipe();
        this.flick = new Flick();
        this.resizePolling = 60;
        this.probeType = 0;
        this.prevent = new Prevent();
        this.HWCompositing = true;
        this.useTransition = true;
        this.useTransform = true;
        this.bindToWrapper = false;
        this.mouseWheel = new MouseeWheel();
        this.snap = false;
        this.zoom = false;
        this.stopPropagation = false;
    }
    chuck(options) {
        if (!options) {
            return this;
        }
        for (let key in options) {
            if (['bounce', 'momentum', 'swipe', 'flick', 'mouseWheel', 'prevent'].includes(key)) {
                this[key].chuck(options[key]);
            }
            else {
                this[key] = options[key];
            }
        }
        return this;
    }
    ready() {
        if (this.isSupportPrevent()) {
            this.prevent.setSupport(this.eventPassthrough === "none");
        }
        this.scrollX = this.eventPassthrough === "horizontal" ? false : this.scrollX;
        this.scrollY = this.eventPassthrough === "vertical" ? false : this.scrollY;
        this.directionLockThreshold = ["horizontal", "vertical"].some(cde => cde === this.eventPassthrough) ? 0 : this.directionLockThreshold;
    }
    getProbeType() {
        return this.probeType;
    }
    getFlickLimitTime() {
        return this.flick.getTime();
    }
    getFlickLimitdistance() {
        return this.flick.getDistance();
    }
    getDirectionLockThreshold() {
        return this.directionLockThreshold;
    }
    getMomentunLimitDistance() {
        return this.momentum.getDistance();
    }
    getMomentunLimitTime() {
        return this.momentum.getTime();
    }
    calculation(destination, start, time, margin, size) {
        return this.momentum.calculation(destination, start, time, margin, size);
    }
    getResizePolling() {
        return this.resizePolling;
    }
    getMouseWheelSpeed() {
        return this.mouseWheel.getSpeed();
    }
    getMouseWheelFactor() {
        return this.mouseWheel.getFactor();
    }
    getMouseWheelTime() {
        return this.mouseWheel.getTime();
    }
    getBounceTime() {
        return this.bounce.getTime();
    }
    isAutoScroll() {
        return this.scrollX && this.scrollY && this.eventPassthrough === "none";
    }
    isHorizontalScroll() {
        return this.scrollX;
    }
    isVerticalScroll() {
        return this.scrollY;
    }
    isSupportTransition() {
        return this.useTransition && PrefixStyle.has('transition');
    }
    isSupportTransform() {
        return this.useTransform && PrefixStyle.has('transform');
    }
    isSupportHardFast() {
        return this.HWCompositing;
    }
    isSpuuort3D() {
        return PrefixStyle.has('perspective');
    }
    isFocusOnWrap() {
        return this.bindToWrapper;
    }
    isSupportWheel() {
        return this.mouseWheel.isSupport();
    }
    isSupportPrevent() {
        return this.prevent.isSupport();
    }
    isSupportBouce() {
        return this.bounce.isSupport();
    }
    isPreventScrollX() {
        return this.eventPassthrough === "horizontal";
    }
    isPreventScrollY() {
        return this.eventPassthrough === "vertical";
    }
    isStopPropagation() {
        return this.stopPropagation;
    }
    isSupportClick() {
        return this.click;
    }
    isSupportTap() {
        return this.tap;
    }
    isSupportFlick() {
        return this.flick.isSupport();
    }
    isSupportMomentum() {
        return this.momentum.isSupport();
    }
    isSupportSnap() {
        return this.snap;
    }
}
