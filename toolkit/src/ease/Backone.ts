import Easeble from './Easeble';

export default class Backone implements Easeble{
	private rule:string 
    constructor() {
       	this.rule = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
       }
       get style(){
       	return this.rule
       }
       priority (k:number):number {
			const b = 4;
			return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
		}

}