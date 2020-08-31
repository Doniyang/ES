import { requestAnimationFrame } from '../raf/index';
import PrefixStyle from '../dom/PrefixStyle'
export default class Transition {
    private scrollElement: HTMLElement;
    /**
     *transition
     */
    constructor(el: HTMLElement) {
        this.scrollElement = el;
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
    
    getScrollStyle():CSSStyleDeclaration{
        return this.scrollElement.style;
    }

    duration(time: number) {
        let durationProp: string = PrefixStyle.style('transitionDuration');
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty(durationProp, time + 'ms');

        if (time === 0 && this.isBadAndroid()) {
            scrollStyle.setProperty(durationProp, '0.0001ms');
            requestAnimationFrame(() => {
                if (scrollStyle.getPropertyValue(durationProp) === '0.0001ms') {
                    scrollStyle.setProperty(durationProp, '0s');
                }
            });
        }
    }

    timing(style: string) {
        let transitionTimingFunction: string = PrefixStyle.style('transitionTimingFunction');
        let scrollStyle: CSSStyleDeclaration = this.getScrollStyle();
        scrollStyle.setProperty(transitionTimingFunction, style)
    }
} 