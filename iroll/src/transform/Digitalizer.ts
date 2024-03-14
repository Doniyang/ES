/**
 * range of roll
 * @author Niyang
 */
export default interface Digitalizer{
    translate(x:number,y:number):void;
    getComputedPosition(): RollKit.Point;
    destory():void;
}