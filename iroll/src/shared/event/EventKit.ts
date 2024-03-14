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
        let target: RollKit.ElementEventTarget = (e.target as RollKit.ElementEventTarget), ev: RollKit.RollCustomEvent;
        if (!(/(SELECT|INPUT|TEXTAREA)/i).test((target.tagName as string))) {
            ev  = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
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