/**
 * 该类使用动画及tranform实现滚动效果
 *
 *
 */
import Animation from "./Animation";
import PrefixStyle from "../../dom/PrefixStyle";
export default class AnimationTranslateRoll {
    constructor(scope, algorithm, notify) {
        this.animation = new Animation();
        this.scope = scope;
        this.raftime = 0;
        this.algorithm = algorithm;
        this.mode = 4;
        this.notify = notify;
    }
    isInAnimation() {
        return this.animation.getState() === 2;
    }
    isTimeOut(now, duration) {
        return now >= duration;
    }
    onFinish() {
        if (this.isPeak()) {
            this.notify.trigger('scroll:end', this.getPosition());
        }
        else {
            this.resetPosition();
        }
    }
    animationFrame(start, dest, duration, startTime) {
        let destTime = startTime + duration, now = Date.now(), newX, newY, easing;
        const that = this;
        if (this.isTimeOut(now, destTime)) {
            this.translate(dest.x, dest.y);
            this.animation.cleanRafId();
            this.onFinish();
            return;
        }
        now = (now - startTime) / duration;
        easing = this.algorithm(now);
        newX = (dest.x - start.x) * easing + start.x;
        newY = (dest.y - start.y) * easing + start.y;
        this.translate(newX, newY);
        if (this.isInAnimation()) {
            this.animation.animate(function (tm) {
                that.raftime = tm;
                that.animationFrame(start, dest, duration, startTime);
            });
        }
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
    isOnRush() {
        return this.scope.isMomentum();
    }
    isPeak() {
        let pos = this.getPosition(), zone = this.getZonePosition();
        return pos.x === zone.x && pos.y === zone.y;
    }
    isClickable() {
        return this.scope.isClickable();
    }
    isTapable() {
        return this.scope.isTap();
    }
    stop() {
        this.setState(0);
        this.animation.cleanRafId();
    }
    resetPosition() {
        let time = this.scope.getBounceTime(), pos = this.getZonePosition();
        this.scrollTo(pos.x, pos.y, time);
    }
    getDirectionLockThreshold() {
        return this.scope.getThreshold();
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
    getMaxScroll() {
        return { x: this.scope.getMaxScrollWidth(), y: this.scope.getMaxScrollHeight() };
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
    getState() {
        return this.animation.getState();
    }
    setState(state) {
        this.animation.setState(state);
    }
    setAnimation(algorithm) {
        this.algorithm = algorithm;
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
        let now = Date.now();
        let position = this.scope.position();
        this.setState(2);
        this.animationFrame(position, { x, y }, time, now);
    }
}