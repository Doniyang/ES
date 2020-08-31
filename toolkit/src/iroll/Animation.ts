import { requestAnimationFrame } from "../raf/index";

export default class Animation {
    private scrollElement: HTMLElement;
    private state: number;
    constructor(el: HTMLElement) {
        this.scrollElement = el;
        this.state = 0;
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
    animate(callback: rafCallback) {
        this.setState(2);
        this.rafId = requestAnimationFrame(callback)
    }
}