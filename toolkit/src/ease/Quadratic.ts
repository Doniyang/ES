import Easeble from './Easeble';

export default class  Quadratic implements Easeble{
   private rule:string
   constructor() {
   	this.rule = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
   }
   get style(){
   	return this.rule
   } 

   priority(k:number):number{
   	return k * ( 2 - k );
   }
}