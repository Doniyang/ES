import EventDigitalizer from "./EventDigitalizer";
import AttributeDigitalizer from "./AttributeDigitalizer";

export default class TouchStartDigitalizer implements EventDigitalizer{
    private preventDefault:boolean;
    
    isAccurateState(state: number): boolean {
       return state===0;
    }
    execute(e: Event,context:AttributeDigitalizer): void {
        context.setStartTime(Date.now())
       context.setState(1)

    }
}