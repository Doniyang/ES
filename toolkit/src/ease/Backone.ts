export default class Backone implements Easeble{
	private cubic:string 
    constructor() {
       	this.cubic = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
       }
       get style(){
       	return this.cubic
       }
       bezier (k:number):number {
			const b = 4;
			return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
		}

}