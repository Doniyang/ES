export default interface Digitalizer{
    scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions):void;
    translate(x:number,y:number):void;
}