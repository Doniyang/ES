import Digitalizer from "./Digitalizer";
import Transition from "./Transition";
import Scope from "./Scope";
import PrefixStyle  from "../dom/PrefixStyle";

export default class TransitionTranslateRoll extends Transition implements Digitalizer{
    private easeStyle:string;
    private scope:Scope;
    private HWCompositing:boolean;
    constructor(el:HTMLElement,scope:Scope,style:string) {
        super(el);
        this.scope = scope;
        this.easeStyle = style;
        this.HWCompositing = true;   
    }

    private isRapid(){
       return this.HWCompositing && PrefixStyle.has(PrefixStyle.style('perspective'))  
    }

    private translate(x:number,y:number){
        let scrollStyle = this.getScrollStyle();
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isRapid() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
    }
    
    scrollTo(x: number, y: number, time: number): void {
        this.duration(time)
        this.timing(this.easeStyle);
        this.translate(x, y);
    }
    
}