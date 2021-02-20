import Scope from "src/scope/Scope";

export default interface RollDigitalizer {
    scrollTo(x: number, y: number, time: number,easing?:string|ScrollKit.Algorithm): void;
    translate(x: number, y: number): void;
    getState(): number;
    setState(state:number): void;
    getScope():Scope;
    getPosition():ScrollKit.Point;
    getComputedPosition():ScrollKit.Point;
    getAnimation():string|ScrollKit.Algorithm;
    stop():void;
    resetPosition():void
}