export default class ACircular {
    algorithm(k) {
        return Math.sqrt(1 - (--k * k));
    }
}
