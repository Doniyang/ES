import Easeble from './Easeble';
export default class Circular implements Easeble{
	private rule:string 
    constructor() {
       	this.rule = 'cubic-bezier(0.1, 0.57, 0.1, 1)' 
       }
       get style(){
       	return this.rule
       }
       priority (k:number):number {
			return Math.sqrt( 1 - ( --k * k ) );
		}
}