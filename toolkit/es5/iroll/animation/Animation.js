import { requestAnimationFrame, cancelAnimationFrame } from "../../raf/index";
export default class Animation {
    constructor() {
        this.state = 0;
        this.rafId = null;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    cleanRafId() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }
    animate(callback) {
        this.rafId = requestAnimationFrame(callback);
    }
}
