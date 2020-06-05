import EventDigitalizer from "./EventDigitalizer";

export default class TouchDigitalizer<T> implements EventDigitalizer<T>{
    private enble:boolean
    constructor() {
       this.enble=true 
    }

    private isSupportTouch():boolean {
        return "ontouchstart" in window
    }
    isEnable():boolean{
        return this.enble
    }
    setEnable(state:boolean){
        this.enble =state
    }
    execute(e: Event,context:T): void {
       
    }

    
}