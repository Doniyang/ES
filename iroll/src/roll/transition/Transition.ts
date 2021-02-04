import { requestAnimationFrame, PrefixStyle } from '@niyang-es/toolkit';
import Roll from '../Roll';
import Variate from '../Variate';
export default class Transition extends Roll {
    constructor(roll:Variate) {
        super(roll);
    }

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

    duration(time: number = 0, scrollStyle: CSSStyleDeclaration) {
        let duration: string = PrefixStyle.style('transitionDuration');
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

    timing(style: string, scrollStyle: CSSStyleDeclaration) {
        let transitionTimingFunction: string = PrefixStyle.style('transitionTimingFunction');
        scrollStyle.setProperty(transitionTimingFunction, style)
        scrollStyle.setProperty('transition-timing-function', style)
    }

    scrollTo(x: number, y: number, time: number): void {
        throw new Error('Method not implemented.');
    }
    translate(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    getPosition(): ScrollKit.Point {
        throw new Error('Method not implemented.');
    }
    getComputedPosition(): ScrollKit.Point {
        throw new Error('Method not implemented.');
    }
    resetPosition(): void {
        throw new Error('Method not implemented.');
    }
    stop(): void {
        throw new Error('Method not implemented.');
    }

} 