export default class Animation {
    private state;
    private rafId;
    constructor();
    getState(): number;
    setState(state: number): void;
    cleanRafId(): void;
    animate(callback: FrameRequestCallback): void;
}
