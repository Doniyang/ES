export default interface Digitalizer{
    scrollTo(x: number, y: number, time: number):void;
    translate(x:number,y:number):void;
    getState():number;
    setState(state:number):void;
}