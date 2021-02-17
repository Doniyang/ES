export default interface RollDigitalizer {
    scrollTo(x: number, y: number, time: number): void;
    translate(x: number, y: number): void;
    getState(): number;
    setState(state:number): void;
    getPosition():ScrollKit.Point;
    getComputedPosition():ScrollKit.Point;
    getAnimation():string|ScrollKit.Algorithm;
    stop():void;
    resetPosition():void
}