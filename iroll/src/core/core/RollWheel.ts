import Attribute from "../attribute/Attribute";
import EventDigitalizer from "../EventDigitalizer";
import RollProxy from "../RollProxy";
export default class RollWheel implements EventDigitalizer {
    private tId: number
    constructor() {
        this.tId = 0
    }

    private isReady(): boolean {
        return this.tId === 0
    }

    private calculate(e: MouseEvent, speed: number): ScrollKit.Point {
        let delta: ScrollKit.Point = { x: Infinity, y: Infinity };
        return delta
    }

    execute(e: Event, attrs: Attribute, proxy: RollProxy): void {
        let deltaX: number, deltaY: number, newX: number, newY: number;
        const that = this;
    }

} 