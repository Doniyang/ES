export default class Circular implements Easeble{
	private cubic:string 
    constructor() {
       	this.cubic = 'cubic-bezier(0.1, 0.57, 0.1, 1)' 
       }
       get style(){
       	return this.cubic
       }
       bezier (k:number):number {
			return Math.sqrt( 1 - ( --k * k ) );
		}
}