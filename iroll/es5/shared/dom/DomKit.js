import { isString } from "@niyang-es/toolkit";
export default class DomKit {
    static getElement(selector) {
        return isString(selector) ? document.body.querySelector(selector) : selector;
    }
    static isSameElement(el, ol) {
        return el.isSameNode(ol);
    }
    static offset(el) {
        let left = 0, top = 0;
        while (el) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
            el = el.offsetParent;
        }
        return {
            x: left,
            y: top
        };
    }
}
