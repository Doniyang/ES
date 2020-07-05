import Easeble from './Easeble';

export default class  Quadratic implements Easeble{
   private cubic:sting
   constructor() {
   	this.cubic = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
   }
   get style(){
   	return this.cubic
   } 

   bezier(k:number):number{
   	return k * ( 2 - k );
   }
}