import AttributeDigitalizer from "./AttributeDigitalizer";
import EventDigitalizer from "./EventDigitalizer";

export default class ContextDigitalizer{
    private attrs:AttributeDigitalizer
    private context:EventDigitalizer|null;
    constructor(){
        this.attrs = new AttributeDigitalizer()
        this.context = null
    }

    setContext(Context:{new(): EventDigitalizer; }):void{
       this.context= new Context();  
    }
    execute(e:Event){
       if((this.context as EventDigitalizer).isAccurateState(this.attrs.getState())){
        (this.context as EventDigitalizer).execute(e,this.attrs)
       }  
    }
}