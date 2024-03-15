export default class EventKit {

    public static isTouchEvent(e: Event): e is TouchEvent {
        return 'touches' in e
    }

    public static tap(e: TouchEvent | MouseEvent, name: string) {
        let point = this.isTouchEvent(e) ? e.touches.item(0) : e
        const evt: RollKit.CustomEvent = document.createEvent('Event');
        evt.initEvent(name, true, true)
        evt.pageX = point?.pageX;
        evt.pageY = point?.pageY;
        e.target?.dispatchEvent(evt)
    }

    public static click(e: MouseEvent | TouchEvent, name: string) {
        let target: RollKit.ElementEventTarget = (e.target as RollKit.ElementEventTarget)
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test((target.tagName as string))) {
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
                })
                target.dispatchEvent(ev)
            } else if (['touchend', 'touchcancel'].includes(e.type)) {
                let ev = new UIEvent(name, {
                    view: e.view || window,
                    detail: 1
                })
                target.dispatchEvent(ev)
            }

        }
    }
}