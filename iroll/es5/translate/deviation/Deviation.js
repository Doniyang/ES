export default class Deviation {
    constructor() { }
    getComputedPosition(el) {
        let marix = window.getComputedStyle(el, null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y };
    }
    translate(x, y, scrollStyle) {
        scrollStyle.setProperty('top', Math.round(y) + 'px');
        scrollStyle.setProperty('left', Math.round(x) + 'px');
    }
}
