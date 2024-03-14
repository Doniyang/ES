import Feature from "../Feature";
export default class Prevent extends Feature {
    constructor() {
        super(true);
        this.regular = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/ };
    }
    regularFilter(el) {
        var _a;
        for (const key in this.regular) {
            if ((_a = this.regular[key]) === null || _a === void 0 ? void 0 : _a.test(el[key])) {
                return true;
            }
        }
        return false;
    }
    filter(el) {
        if (this.isSupport()) {
            return this.regularFilter(el);
        }
        return false;
    }
}
