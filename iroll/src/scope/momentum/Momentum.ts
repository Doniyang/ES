export default class Momentum {
    private period: number;
    private threshold: number;
    constructor() {
        this.period = 300
        this.threshold = 15
    }

    getPeriod(): number {
        return this.period
    }
    setPeriod(period: number): void {
        this.period = period
    }

    getThreshold(): number {
        return this.threshold
    }

    setThreshold(threshold: number): void {
        this.threshold = threshold
    }
}