/**
 * @class Animation
 * @classdesc scroll by animation
 * @author niyang 
 */
import { requestAnimationFrame, cancelAnimationFrame } from "@niyang-es/toolkit";
import Roll from "../Roll";
import Variate from "../Variate";

export default class Animation extends Roll {

    private state: number;

    private rafId: null | number;

    constructor(roll:Variate) {
        super(roll);
        this.state = 0;
        this.rafId = null
    }

   private cancelAnimationFrameleanRafId() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
        }
    }

   private animate(callback: FrameRequestCallback) {
        this.rafId = requestAnimationFrame(callback)
    }

    scrollTo(x: number, y: number, time: number): void {
        throw new Error("Method not implemented.");
    }
    translate(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    getPosition(): ScrollKit.Point {
        throw new Error("Method not implemented.");
    }
    getComputedPosition(): ScrollKit.Point {
        throw new Error("Method not implemented.");
    }
    resetPosition(): void {
        throw new Error("Method not implemented.");
    }
    stop(): void {
        throw new Error("Method not implemented.");
    }
}