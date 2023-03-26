import Scope from "../../scope/Scope";

export default interface Digitalizer { 
  getScope():Scope;
  
  scrollTo(x: number, y: number, time: number, easing?: string | ScrollKit.Algorithm): void;

  translate(x: number, y: number): void;

  getState(): number;

  setState(state: number): void;

  getPosition(): ScrollKit.Point;

  getComputedPosition(): ScrollKit.Point;

  getAnimation(): string | ScrollKit.Algorithm;

  stop(): void;

  resetPosition(): void
}