export default class AEaseOutQuint {
    algorithm(t) {
        return 1 + (--t * t * t * t * t);
    }
}
