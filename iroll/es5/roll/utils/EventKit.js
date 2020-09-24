export default class EventKit {
    static isTouchEvent(e) {
        return 'touches' in e;
    }
    static tap(e, name) {
        var _a;
        let point = this.isTouchEvent(e) ? e.touches.item(0) : e;
        const evt = document.createEvent('Event');
        evt.initEvent(name, true, true);
        evt.pageX = point === null || point === void 0 ? void 0 : point.pageX;
        evt.pageY = point === null || point === void 0 ? void 0 : point.pageY;
        (_a = e.target) === null || _a === void 0 ? void 0 : _a.dispatchEvent(evt);
    }
    static click(e, name) {
        let target = e.target, evt;
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
            evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(name, true, true, e === null || e === void 0 ? void 0 : e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
            target === null || target === void 0 ? void 0 : target.dispatchEvent(evt);
        }
    }
}
