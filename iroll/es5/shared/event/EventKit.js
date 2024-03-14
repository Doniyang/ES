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
        let target = e.target, ev;
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
            ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
            ev.initEvent('click', true, true);
            ev.view = e.view || window;
            ev.detail = 1;
            ev.screenX = target.screenX || 0;
            ev.screenY = target.screenY || 0;
            ev.clientX = target.clientX || 0;
            ev.clientY = target.clientY || 0;
            ev.ctrlKey = !!e.ctrlKey;
            ev.altKey = !!e.altKey;
            ev.shiftKey = !!e.shiftKey;
            ev.metaKey = !!e.metaKey;
            ev.button = 0;
            ev.relatedTarget = null;
            ev._constructed = true;
            target.dispatchEvent(ev);
        }
    }
}
