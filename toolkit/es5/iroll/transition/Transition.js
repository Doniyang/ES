import { requestAnimationFrame } from '../../raf/index';
import PrefixStyle from '../../dom/PrefixStyle';
export default class Transition {
    /**
     *transition
     */
    constructor() {
        this.state = 0;
    }
    isBadAndroid() {
        let appVersion = window.navigator.appVersion;
        // Android browser is not a chrome browser.
        if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
            let safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
            if (safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
                return parseFloat(safariVersion[1]) < 535.19;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    duration(time = 0, scrollStyle) {
        let duration = PrefixStyle.style('transitionDuration');
        scrollStyle.setProperty(duration, time + 'ms');
        if (time === 0) {
            this.setState(1);
        }
        if (time === 0 && this.isBadAndroid()) {
            scrollStyle.setProperty(duration, '0.0001ms');
            requestAnimationFrame(() => {
                if (scrollStyle.getPropertyValue(duration) === '0.0001ms') {
                    scrollStyle.setProperty(duration, '0s');
                }
            });
        }
    }
    timing(style, scrollStyle) {
        let transitionTimingFunction = PrefixStyle.style('transitionTimingFunction');
        scrollStyle.setProperty(transitionTimingFunction, style);
    }
}
