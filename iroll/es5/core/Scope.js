import Axis from "../axis/Axis";
import { ToolKit } from "../shared";
import Meta from "./Meta";
export default class Scope {
    constructor(el) {
        this.rootElement = el;
        this.beta = new Axis();
        this.theta = new Axis();
        this.delta = new Axis();
        this.beta = new Axis();
        this.zeta = new Axis();
        this.eta = new Axis();
        this.iota = new Axis();
        this.kappa = new Axis();
        this.gamma = 0;
        this.sigma = 0;
        this.state = 0;
        this.mode = 0;
        this.status = 0;
        this.meta = new Meta();
    }
    getSpecifiedIndex() {
        return this.meta.specifiedIndex || 0;
    }
    isNoLock() {
        return this.mode === 0;
    }
    isAutoScroll() {
        return this.meta.isAutoScroll();
    }
    getClientWidth() {
        return this.rootElement.clientWidth;
    }
    getClientHeight() {
        return this.rootElement.clientHeight;
    }
    getScrollOffsetWidth() {
        return this.getRollElement().offsetWidth;
    }
    getScrollOffsetHeight() {
        return this.getRollElement().offsetHeight;
    }
    getScrollStopTime() {
        return this.sigma;
    }
    getScrollStartTime() {
        return this.gamma;
    }
    merge(options) {
        this.meta.chuck(options).ready();
    }
    getRootElement() {
        return this.rootElement;
    }
    getRollElement() {
        return this.rootElement.children.item(this.getSpecifiedIndex());
    }
    isHorizontalScroll() {
        return this.meta.isHorizontalScroll() && ToolKit.isLessThan(this.getClientWidth(), this.getScrollOffsetWidth());
    }
    isVerticalScroll() {
        return this.meta.isVerticalScroll() && ToolKit.isLessThan(this.getClientHeight(), this.getScrollOffsetHeight());
    }
    getMaxScrollX() {
        if (!this.isHorizontalScroll()) {
            return 0;
        }
        return this.getClientWidth() - this.getScrollOffsetWidth();
    }
    getMaxScrollY() {
        if (!this.isVerticalScroll()) {
            return 0;
        }
        return this.getClientHeight() - this.getScrollOffsetHeight();
    }
    setBeta(x, y) {
        this.beta.setAxisX(x);
        this.beta.setAxisY(y);
    }
    getBeta() {
        return { x: this.beta.getAxisX(), y: this.beta.getAxisY() };
    }
    setDelta(x, y) {
        this.delta.setAxisX(x);
        this.delta.setAxisY(y);
    }
    getDelta() {
        return { x: this.delta.getAxisX(), y: this.delta.getAxisY() };
    }
    setTheta(x, y) {
        this.theta.setAxisX(x);
        this.theta.setAxisY(y);
    }
    getTheta() {
        return { x: this.theta.getAxisX(), y: this.theta.getAxisY() };
    }
    setEta(x, y) {
        this.eta.setAxisX(x);
        this.eta.setAxisY(y);
    }
    getEta() {
        return { x: this.eta.getAxisX(), y: this.eta.getAxisY() };
    }
    setIota(x, y) {
        this.iota.setAxisX(x);
        this.iota.setAxisY(y);
    }
    getIota() {
        return { x: this.iota.getAxisX(), y: this.iota.getAxisY() };
    }
    setKappa(x, y) {
        this.kappa.setAxisX(x);
        this.kappa.setAxisY(y);
    }
    getZeta() {
        return { x: this.zeta.getAxisX(), y: this.zeta.getAxisY() };
    }
    setZeta(x, y) {
        this.zeta.setAxisX(x);
        this.zeta.setAxisY(y);
    }
    updateMode(absDeltaX, absDeltaY) {
        if (this.isNoLock() && (!this.isAutoScroll())) {
            if (absDeltaX > absDeltaY + this.meta.getDirectionLockThreshold()) {
                this.setMode(1);
            }
            else if (absDeltaY >= absDeltaX + this.meta.getDirectionLockThreshold()) {
                this.setMode(2);
            }
            else {
                this.setMode(0);
            }
        }
    }
    setScrollStartTime(t) {
        this.gamma = t;
    }
    setScrollStopTime(t) {
        this.sigma = t;
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    setMode(mode) {
        this.mode = mode;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    getResizePolling() {
        return this.meta.getResizePolling();
    }
    getMouseWheelSpeed() {
        return this.meta.getMouseWheelSpeed();
    }
    getMouseWheelFactor() {
        return this.meta.getMouseWheelFactor();
    }
    getMouseWheelTime() {
        return this.meta.getMouseWheelTime();
    }
    getProbeType() {
        return this.meta.getProbeType();
    }
    getTaskTime() {
        return this.getScrollStopTime() - this.getScrollStartTime();
    }
    getBounceTime() {
        return this.meta.getBounceTime();
    }
    directionXCalc(duration, destination) {
        if (this.isHorizontalScroll()) {
            let size = this.isSupportBouce() ? this.getClientWidth() : 0;
            return this.meta.calculation(this.zeta.getAxisX(), this.eta.getAxisX(), duration, this.getMaxScrollX(), size);
        }
        return { destination: destination, duration: 0 };
    }
    directionYCalc(duration, destination) {
        if (this.isVerticalScroll()) {
            let size = this.isSupportBouce() ? this.getClientHeight() : 0;
            return this.meta.calculation(this.zeta.getAxisY(), this.eta.getAxisY(), duration, this.getMaxScrollY(), size);
        }
        return { destination: destination, duration: 0 };
    }
    isSupportTransition() {
        return this.meta.isSupportTransition();
    }
    isSupportTransform() {
        return this.meta.isSupportTransform();
    }
    isSupportHardFast() {
        return this.meta.isSupportHardFast();
    }
    isSpuuort3D() {
        return this.meta.isSpuuort3D();
    }
    isFocusOnWrap() {
        return this.meta.isFocusOnWrap();
    }
    isSupportWheel() {
        return this.meta.isSupportWheel();
    }
    isSupportPrevent() {
        return this.meta.isSupportPrevent();
    }
    isLockScrollX() {
        return this.mode === 1;
    }
    isLockScrollY() {
        return this.mode === 2;
    }
    isPreventScrollX() {
        return this.meta.isPreventScrollX();
    }
    isPreventScrollY() {
        return this.meta.isPreventScrollY();
    }
    isStopPropagation() {
        return this.meta.isStopPropagation();
    }
    isSupportBouce() {
        return this.meta.isSupportBouce();
    }
    isSupportClick() {
        return this.meta.isSupportClick();
    }
    isSupportTap() {
        return this.meta.isSupportTap();
    }
    isSupportFlick(duration, absDistX, absDistY) {
        const time = this.meta.getFlickLimitTime();
        const distance = this.meta.getFlickLimitdistance();
        return this.meta.isSupportFlick() && ToolKit.isLessThan(duration, time) && ToolKit.isLessThan(absDistX, distance) && ToolKit.isLessThan(absDistY, distance);
    }
    isSupportMomentum(duration, absDistX, absDistY) {
        const time = this.meta.getMomentunLimitTime();
        const distance = this.meta.getMomentunLimitDistance();
        return this.meta.isSupportMomentum() && ToolKit.isLessThan(duration, time) && (ToolKit.isLessThan(distance, absDistX) || ToolKit.isLessThan(distance, absDistY));
    }
    isOutBoundary() {
        const pos = this.getZeta();
        let roundX = pos.x;
        let roundY = pos.y;
        if ((!this.isHorizontalScroll()) || ToolKit.isLessThan(0, pos.x)) {
            roundX = 0;
        }
        else if (ToolKit.isLessThan(pos.x, this.getMaxScrollX())) {
            roundX = this.getMaxScrollX();
        }
        if ((!this.isVerticalScroll()) || ToolKit.isLessThan(0, pos.y)) {
            roundY = 0;
        }
        else if (ToolKit.isLessThan(pos.y, this.getMaxScrollY())) {
            roundY = this.getMaxScrollY();
        }
        return roundX !== pos.x || roundY !== pos.y;
    }
    isInvalidSlip(timestamp, absThetaX, absThetaY) {
        const time = this.meta.getMomentunLimitTime();
        const distance = this.meta.getMomentunLimitDistance();
        return ToolKit.isLessThan(time, timestamp - this.getScrollStopTime()) && ToolKit.isLessThan(distance, absThetaX) && ToolKit.isLessThan(distance, absThetaY);
    }
    isValidSlip(timestamp) {
        return ToolKit.isLessThan(this.meta.getMomentunLimitTime(), timestamp - this.getScrollStartTime());
    }
    isSupportSnap() {
        return this.meta.isSupportSnap();
    }
}
