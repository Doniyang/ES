import { requestAnimationFrame, cancelAnimationFrame } from "../../raf/index";

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

    animate(callback: rafCallback) {
        this.rafId = requestAnimationFrame(callback)
    }
}