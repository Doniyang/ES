export default abstract class Roll{
    abstract  scrollTo(x: number, y: number, time: number): void;
    abstract translate(x: number, y: number): void;
    abstract getPosition():ScrollKit.Point;
    abstract getComputedPosition():ScrollKit.Point;
    abstract resetPosition():void;
    abstract stop():void;
}