export default class ABackone {
    algorithm(k) {
        let b = 4;
        return (k = k - 1) * k * ((b + 1) * k + b) + 1;
    }
}
