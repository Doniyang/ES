export default class EventKit {
    static isTouchEvent(e: Event): e is TouchEvent;
    static tap(e: TouchEvent | MouseEvent, name: string): void;
    static click(e: MouseEvent | TouchEvent, name: string): void;
}
