export default class Event {
    public static isTouchEvent(e: Event): e is TouchEvent {
        return 'touches' in e
    }
}