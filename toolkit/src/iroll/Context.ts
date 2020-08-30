import Attribute from "./Attribute";
import Rollable from "./Rollable";
import Digitalizer from "./Digitalizer";

export default class Context {
    private attrs: Attribute;
    private context: null | Rollable;
    private strategy: null | Digitalizer;
    constructor(proxy: Digitalizer) {
        this.attrs = new Attribute();
        this.context = null;
        this.strategy = null;
    }

    setContext(c: ({ new(): Rollable; })): void {
        this.context = new c()
    }

    setStrategy(strategy:Digitalizer):void{
        this.strategy = strategy  
    }
    execute(e: Event) {
        if ((this.context as Rollable).attainState(this.attrs.getState())) {
            (this.context as Rollable).execute(e, this.attrs, this.strategy)
        }
    }
}