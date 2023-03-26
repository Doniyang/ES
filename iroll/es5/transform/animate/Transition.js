import { requestAnimationFrame, PrefixStyle, Circular, isString } from '@niyang-es/toolkit';
import AbstractAnimate from './AbstractAnimate';
import { ToolKit } from '../../shared';
export default class Transition extends AbstractAnimate {
    /**
     * @constructor
     * @param scope
     * @param roll
     */
    constructor(scope, roll) {
        super(scope, roll);
    }
    /**
     * @method duration
     * @param time
     * @param scrollStyle
     * @description the animation finish time
     */
    duration(time = 0, scrollStyle) {
        let duration = PrefixStyle.style('transition-duration');
        scrollStyle.setProperty(duration, time + 'ms');
        scrollStyle.setProperty('transition-duration', time + 'ms');
        if (time === 0) {
            this.setState(1);
        }
        if (time === 0 && ToolKit.isBadAndroid()) {
            scrollStyle.setProperty(duration, '0.0001ms');
            scrollStyle.setProperty('transition-duration', '0.0001ms');
            requestAnimationFrame(() => {
                if ((scrollStyle.getPropertyValue(duration) || scrollStyle.getPropertyValue('transition-duration')) === '0.0001ms') {
                    scrollStyle.setProperty(duration, '0s');
                    scrollStyle.setProperty('transition-duration', '0ms');
                }
            });
        }
    }
    /**
     * @method animate
     * @param style
     * @param scrollStyle
     * @description set transition animation
     */
    animate(style, scrollStyle) {
        let transitionTimingFunction = PrefixStyle.style('transition-timing-function');
        scrollStyle.setProperty(transitionTimingFunction, style);
        scrollStyle.setProperty('transition-timing-function', style);
    }
    /**
     * @method scrollTo
     * @param x
     * @param y
     * @param time
     * @param easing
     * @description scroll to some pont with animation
     */
    scrollTo(x, y, time, easing) {
        let scrollStyle = this.getElement().style;
        let easingStyle = isString(easing) ? easing : this.getAnimation();
        this.setState(1);
        this.duration(time, scrollStyle);
        this.animate(easingStyle, scrollStyle);
        this.translate(x, y);
    }
    /**
     * @method stop
     * @description stop
     */
    stop() {
        let pos = this.getComputedPosition();
        this.duration(0, this.getElement().style);
        this.translate(pos.x, pos.y);
        this.setState(0);
    }
    /**
     * @method getAnimation
     * @description get default animation
     */
    getAnimation() {
        return (new Circular()).style();
    }
}
