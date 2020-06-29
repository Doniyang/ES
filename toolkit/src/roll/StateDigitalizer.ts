export default class StateDigitalizer{
    private state:number;
    constructor(){
        this.state=0
    }
    getState():number{
        return this.state
    }
    setState(state:number):void{
      this.state =state
    }
}