import { requestAnimationFrame } from '../../raf/index';
import PrefixStyle from '../../dom/PrefixStyle'
export default class Transition {
    /**
     * 状态
     */
    private state: number;
    /**
     *transition
     */
    constructor() {
        this.state = 0;
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

    getState(): number {
        return this.state;
    }

    setState(state: number): void {
        this.state = state
    }

    duration(time: number = 0, scrollStyle: CSSStyleDeclaration) {
        let durationProp: string = PrefixStyle.style('transitionDuration');
        scrollStyle.setProperty(durationProp, time + 'ms');
        if (time === 0) {
            this.setState(1);
        }
        if (time === 0 && this.isBadAndroid()) {
            scrollStyle.setProperty(durationProp, '0.0001ms');
            requestAnimationFrame(() => {
                if (scrollStyle.getPropertyValue(durationProp) === '0.0001ms') {
                    scrollStyle.setProperty(durationProp, '0s');
                }
            });
        }
    }

    timing(style: string, scrollStyle: CSSStyleDeclaration) {
        let transitionTimingFunction: string = PrefixStyle.style('transitionTimingFunction');
        scrollStyle.setProperty(transitionTimingFunction, style)
    }
} 