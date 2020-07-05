export default class AxisDigitalizer {
	private axisCode:number;
	constructor() {
	  this.axisCode=-1
	}

	setLockXAxis():void{
		this.axisCode=1
	}

	setLockYAxis():void{
		this.axisCode=2
	}
	setLockXYAxis():void{
		this.axisCode=0
	}

	isLockXAxis():boolean{
       return this.axisCode===1
	}
	isLockYAxis():boolean{
		return this.axisCode === 2
	}
	isAllAxis(){
		return this.axisCode ===0
	}
}