import EventDigitalizer from "./EventDigitalizer";
import RollProxy from "./RollProxy";
export default class Context {
    private attrs;
    private context;
    private proxy;
    constructor(proxy: RollProxy);
    setStart(x: number, y: number): void;
    getStartX(): number;
    getStartY(): number;
    setState(state: number): void;
    setMode(m: number): void;
    setContext(Digitalizer: ({
        new (): EventDigitalizer;
    })): void;
    execute(e: Event): void;
}
