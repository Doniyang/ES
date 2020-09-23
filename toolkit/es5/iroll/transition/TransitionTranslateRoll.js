import Transition from "./Transition";
import PrefixStyle from "../../dom/PrefixStyle";
export default class TransitionTranslateRoll {
    constructor(scope, style) {
        this.mode = 2;
        this.transition = new Transition();
        this.scope = scope;
        this.easingStyle = style;
    }
    isRapid() {
        return true;
    }
    getScrollElement() {
        return this.scope.getScrollElement();
    }
    getScrollStyle() {
        return this.getScrollElement().style;
    }
    getZonePosition() {
        let pos = this.getPosition();
        let x = pos.x, y = pos.y;
        //左边
        if (!this.isHScroll() || pos.x > 0) {
            x = 0;
        }
        else if (pos.x < this.scope.getMaxScrollWidth()) { //右边
            x = this.scope.getMaxScrollWidth();
        }
        //上边
        if (!this.isVScroll() || pos.y > 0) {
            y = 0;
        }
        else if (pos.y < this.scope.getMaxScrollHeight()) { //下边
            y = this.scope.getMaxScrollHeight();
        }
        return { x, y };
    }
    isFreeScroll() {
        return this.scope.isAxisScroll();
    }
    isHScroll() {
        return this.scope.isLockAxisXScroll();
    }
    isVScroll() {
        return this.scope.isLockAxisYScroll();
    }
    isHPassthrough() {
        return this.scope.isAxisXPassthrough();
    }
    isVPassthrough() {
        return this.scope.isAxisYPassthrough();
    }
    isTransition() {
        return this.mode === 2;
    }
    isResilient() {
        return this.scope.isBounce();
    }
    isPeak() {
        let pos = this.getPosition(), zone = this.getZonePosition();
        return pos.x === zone.x && pos.y === zone.y;
    }
    isOnRush() {
        return this.scope.isMomentum();
    }
    isClickable() {
        return this.scope.isClickable();
    }
    isTapable() {
        return this.scope.isTap();
    }
    getDirectionLockThreshold() {
        return this.scope.getThreshold();
    }
    getMaxScroll() {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
    }
    getPosition() {
        return this.scope.position();
    }
    getSize() {
        return { x: this.scope.getClientWidth(), y: this.scope.getClientHeight() };
    }
    getDeceleration() {
        return this.scope.getDeceleration();
    }
    getComputedPosition() {
        let marix = window.getComputedStyle(this.getScrollElement(), null);
        let x = 0, y = 0;
        let transform = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform');
        let matrixs = transform.split(')')[0].split(', ');
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return { x, y };
    }
    stop() {
        let pos = this.getComputedPosition();
        this.transition.duration(0, this.getScrollStyle());
        this.translate(pos.x, pos.y);
        this.setState(0);
    }
    resetPosition() {
        let time = this.scope.getBounceTime(), pos = this.getZonePosition();
        this.scrollTo(pos.x, pos.y, time);
    }
    getState() {
        return this.transition.getState();
    }
    setAnimation(style) {
        this.easingStyle = style;
    }
    setState(state) {
        this.transition.setState(state);
    }
    translate(x, y) {
        let scrollStyle = this.getScrollStyle();
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isRapid() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
        this.scope.setAxis(x, y);
    }
    scrollTo(x, y, time) {
        this.transition.duration(time, this.getScrollStyle());
        this.transition.timing(this.easingStyle, this.getScrollStyle());
        this.translate(x, y);
    }
}
