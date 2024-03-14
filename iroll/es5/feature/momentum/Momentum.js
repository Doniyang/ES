import Feature from "../Feature";
export default class Momentum extends Feature {
    constructor() {
        super(true);
        this.time = 300;
        this.distance = 15;
        this.deceleration = 0.0006;
    }
    speed(destination, tm) {
        return Math.abs(destination) / tm;
    }
    direction(destination) {
        return destination < 0 ? -1 : 1;
    }
    getTime() {
        return this.time;
    }
    setTime(period) {
        this.period = period;
    }
    getDistance() {
        return this.distance;
    }
    setDistance(distance) {
        this.distance = distance;
    }
    setDeceleration(deceleration) {
        this.deceleration = deceleration;
    }
    getDeceleration() {
        return this.deceleration;
    }
    calculation(current, start, time, margin, size) {
        let dist = current - start, speed = this.speed(dist, time), deceleration = this.getDeceleration(), direction = this.direction(dist), destination, duration;
        destination = current + (speed * speed) / (2 * deceleration) * direction;
        duration = speed / deceleration;
        if (destination < margin) {
            destination = size ? margin - (size / 2.5 * (speed / 8)) : margin;
            dist = Math.abs(destination - current);
            duration = dist / speed;
        }
        else if (destination > 0) {
            destination = size ? size / 2.5 * (speed / 8) : 0;
            dist = Math.abs(current) + destination;
            duration = dist / speed;
        }
        return {
            destination: Math.round(destination),
            duration: duration
        };
    }
}
