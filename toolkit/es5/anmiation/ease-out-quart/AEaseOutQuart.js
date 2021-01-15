export default class AEaseOutQuart {
    algorithm(t) {
        return 1 - (--t * t * t * t);
    }
}
