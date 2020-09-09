import { requestAnimationFrame, cancelAnimationFrame } from "../../raf/index";

export default class Animation {
    private scrollElement: HTMLElement;
    private state: number;

    private rafId: null | number;

    constructor(el: HTMLElement) {
        this.scrollElement = el;
        this.state = 0;
        this.rafId = null
    }

    getScrollStyle(): CSSStyleDeclaration {
        return this.scrollElement.style;
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
        this.setState(2);
        this.rafId = requestAnimationFrame(callback)
    }
}