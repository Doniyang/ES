export default class ParametricSerializer<T>{
    private property:T;
    constructor(defaultProp:T) {
    	this.property =defaultProp
    }
    
    setProperty(property:T):void{
    	this.property=property;
    }
    getProperty():T{
    	return this.property
    }
}