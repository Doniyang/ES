import { requestAnimationFrame, PrefixStyle } from '@niyang-es/toolkit';
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
} 