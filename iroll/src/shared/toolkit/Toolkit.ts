export default class ToolKit {
    /**
     * @method isBadAndroid
     * @description
     */
    static isBadAndroid(): boolean {
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
     * @description a < b
     * @param a 
     * @param b 
     * @returns boolean
     */ 
    static isLessThan(a:number,b:number){
        return a < b
    }
}
