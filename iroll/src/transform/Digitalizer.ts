/**
 * range of roll
 * @author Niyang
 */
export default interface Digitalizer{
    rule():void
    translate(x:number,y:number):void;
    getComputedPosition(): RollKit.Point;
}