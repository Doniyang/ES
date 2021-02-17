import { requestAnimationFrame, PrefixStyle,Circular, isString } from '@niyang-es/toolkit';
import Scope from 'src/scope/Scope';
import Designor from '../Designor';
import Roll from '../Roll';
import Variate from '../Variate';
export default class Transition extends Roll implements Designor{
    /**
     * @constructor
     * @param scope 
     * @param roll 
     */
    constructor(scope:Scope,roll:Variate) {
        super(scope,roll);
    }
    /**
     * @method isBadAndroid
     * @description 
     */
    private isBadAndroid(): boolean {
        let appVersion = window.navigator.appVersion;
        // Android browser is not a chrome browser.
        if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
            let safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
            if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
                return parseFloat(safariVersion[1]) < 535.19;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    /**
     * @method duration
     * @param time 
     * @param scrollStyle 
     * @description the animation finish time
     */
    private duration(time: number = 0, scrollStyle: CSSStyleDeclaration) {
        let duration: string = PrefixStyle.style('transition-duration');
        scrollStyle.setProperty(duration, time + 'ms');
        scrollStyle.setProperty('transition-duration', time + 'ms')
        if (time === 0) {
            this.setState(1);
        }
        if (time === 0 && this.isBadAndroid()) {
            scrollStyle.setProperty(duration, '0.0001ms');
            scrollStyle.setProperty('transition-duration', '0.0001ms')
            requestAnimationFrame(() => {
                if ((scrollStyle.getPropertyValue(duration) || scrollStyle.getPropertyValue('transitionDuration')) === '0.0001ms') {
                    scrollStyle.setProperty(duration, '0s');
                    scrollStyle.setProperty('transition-duration', '0ms')
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
    private animate(style: string, scrollStyle: CSSStyleDeclaration) {
        let transitionTimingFunction: string = PrefixStyle.style('transition-timing-function');
        scrollStyle.setProperty(transitionTimingFunction, style)
        scrollStyle.setProperty('transition-timing-function', style)
    }
    /**
     * @method scrollTo
     * @param x 
     * @param y 
     * @param time 
     * @param easing 
     * @description scroll to some pont with animation
     */
    scrollTo(x: number, y: number, time: number,easing:string): void {
        let scrollStyle:CSSStyleDeclaration = this.getElement().style;
        let easingStyle = isString(easing)?easing:this.getAnimation()
        this.setState(1);
        this.duration(time, scrollStyle)
        this.animate(easingStyle, scrollStyle);
        this.translate(x, y);
    }
    /**
     * @method stop
     * @description stop
     */
    stop():void{
        let pos = this.getComputedPosition();
        this.duration(0, this.getElement().style);
        this.translate(pos.x, pos.y);
        this.setState(0);
    }
    /**
     * @method getAnimation
     * @description get default animation
     */
    getAnimation():string{
        return (new Circular()).style()
    }
} 