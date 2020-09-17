export default class EventKit {

    public static isTouchEvent(e: Event): e is TouchEvent {
        return 'touches' in e
    }

    public static tap(e: TouchEvent | MouseEvent, name: string) {
        let point = this.isTouchEvent(e) ? e.touches.item(0) : e
        const evt: ScrollKit.CustomEvent = document.createEvent('Event');
        evt.initEvent(name, true, true)
        evt.pageX = point?.pageX;
        evt.pageY = point?.pageY;
        e.target?.dispatchEvent(evt)
    }

    public static click(e: MouseEvent | TouchEvent, name: string) {
        let target: ScrollKit.ElementEventTarget = (e.target as ScrollKit.ElementEventTarget), evt;
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test((target.tagName as string))) {
            evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(name, true, true, (e?.view as Window), 1,
                (target.screenX as number), (target.screenY as number), (target.clientX as number), (target.clientY as number),
                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                0, null);
            target?.dispatchEvent(evt);
        }
    }
}