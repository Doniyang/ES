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
        let target = e.target;
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
            if (['mouseup', 'mousecancel'].includes(e.type)) {
                let ev = new MouseEvent(name, {
                    view: e.view || window,
                    detail: 1,
                    screenX: target.screenX || 0,
                    screenY: target.screenY || 0,
                    clientX: target.clientX || 0,
                    clientY: target.clientY || 0,
                    ctrlKey: !!e.ctrlKey,
                    altKey: !!e.altKey,
                    shiftKey: !!e.shiftKey,
                    metaKey: !!e.metaKey,
                    button: 0,
                    relatedTarget: null
                });
                target.dispatchEvent(ev);
            }
            else if (['touchend', 'touchcancel'].includes(e.type)) {
                let ev = new UIEvent(name, {
                    view: e.view || window,
                    detail: 1
                });
                target.dispatchEvent(ev);
            }
        }
    }
}
