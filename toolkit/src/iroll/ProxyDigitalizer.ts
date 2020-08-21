import Digitalizer from "./Digitalizer";

export default class ProxyDigitalizer implements Digitalizer{
   private roll:Digitalizer;

   constructor(roll:Digitalizer){
       this.roll = roll
   }

    setState(state:number){
      this.roll.setState(state)
    }

    scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions){
       this.roll.scrollTo(x,y,time,easing) 
    }

    translate(x:number,y:number):void{
      this.roll.translate(x,y);
    }
}