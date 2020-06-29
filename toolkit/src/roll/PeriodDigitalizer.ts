export default class PeriodDigitalizer {
    private starttime: number;
    private endtime: number;
    constructor() {
        this.starttime = 0
        this.endtime = 0
    }
    getStartTime(): number {
        return this.starttime
    }
    setStartTime(time: number): void {
        this.starttime = time
    }

    getEndTime(): number {
        return this.endtime
    }
    setEndTime(time: number): void {
        this.endtime = time
    }
} 