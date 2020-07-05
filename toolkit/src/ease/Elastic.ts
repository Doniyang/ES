export default class Elastic implements Easeble{
	private cubic:string 
    constructor() {
       	this.cubic = '' 
       }
       get style(){
       	return this.cubic
       }
       bezier (k:number):number {
			let f = 0.22,
          e = 0.4;

        if ( k === 0 ) { return 0; }
        if ( k == 1 ) { return 1; }

        return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
		}

}