import { isBoolean, isPlainObject } from "@niyang-es/toolkit";
export default class Feature {
    constructor(enabled) {
        this.enabled = enabled;
    }
    merge(options) {
        for (let key in options) {
            this[key] = options[key];
        }
    }
    isSupport() {
        return this.enabled;
    }
    setSupport(enabled) {
        this.enabled = enabled;
    }
    chuck(options) {
        if (isBoolean(options)) {
            this.setSupport(options);
        }
        else if (isPlainObject(options)) {
            this.merge(options);
        }
        else {
            this.setSupport(false);
        }
    }
}
