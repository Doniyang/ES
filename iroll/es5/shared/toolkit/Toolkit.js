export default class ToolKit {
    static isBadAndroid() {
        let appVersion = window.navigator.appVersion;
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
    static isLessThan(a, b) {
        return a < b;
    }
}
