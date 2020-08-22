import Digitalizer from "./Digitalizer";

export default class ProxyDigitalizer implements Digitalizer{
   private roll:null|Digitalizer;

   constructor(){
       this.roll = null;
   }

   build(){},

    scrollTo(x: number, y: number, time: number, easing: EaseKit.EaseOptions){
      (this.roll as Digitalizer).scrollTo(x,y,time,easing) 
    }

    translate(x:number,y:number):void{
      (this.roll as Digitalizer).translate(x,y);
    }
}