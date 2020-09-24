import { requestAnimationFrame, cancelAnimationFrame } from "@niyang-es/toolkit";

export default class Animation {

    private state: number;

    private rafId: null | number;

    constructor() {
        this.state = 0;
        this.rafId = null
    }

    getState(): number {
        return this.state
    }
    setState(state: number): void {
        this.state = state
    }

    cleanRafId() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
        }
    }

    animate(callback: FrameRequestCallback) {
        this.rafId = requestAnimationFrame(callback)
    }
}