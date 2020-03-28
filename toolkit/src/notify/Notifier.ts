import Notification from './Notification'
import  ClassicEvent from '../event/ClassicEvent';

export default class Notifier extends Notification {
	private map:EventMapOptions<string,MapSetOptions<string>>;
	constructor() {
		super();
        this.map = new Map();	
    }

    on(name:string,fn:toolkit.fnOption,dataset?:toolkit.mulitOption):void{
        const set:MapSetOptions<string>|undefined = this.map.get(name);
        const opts:NotifierOptions = !!dataset?({dataset:dataset,fn:fn}):({fn:fn});
        if(set===undefined){this.map.set(name,set=new Set())}
        set.add(JSON.stringify(opts)) 
    }

    off(name:string,fn?:toolkit.fnOption,dataset?:toolkit.mulitOption):void{
       if(fn===undefined){return  this.map.delete(name)}
       const set:MapSetOptions<string>|undefined = this.map.get(name)
        if(!!set){
            const opts:NotifierOptions = !!dataset?({dataset:dataset,fn:fn}):({fn:fn});
            set.delete(JSON.stringify(opts))
        }
    }

    has(name:string,fn:toolkit.fnOption,dataset?:toolkit.mulitOption):boolean{
        if(this.map.has(name)){
            const opts:NotifierOptions = !!dataset?({dataset:dataset,fn:fn}):({fn:fn});
            const set:MapSetOptions<string> = this.map.get(name)
            return  set.has(JSON.stringify(op));
        }else{
            return false
        }
    }
    /**
    * clear all event
    */   
    clean(){
        this.map.clear()
    }

    notify(name:string,...args:Array<toolkit.mulitOption>){
        if(this.map.has(name)){
            let event:EventNotifier = new ClassicEvent(this,name)
            let sets:MapSetOptions<string> = this.map.get(name)
            if(!event.isisStopImmediatePropagation){
                this.dispatch(event,sets,args) 
            }
        }
    }
    dispatch(evt:EventNotifier,fnset:MapSetOptions<string>,args:Array<toolkit.mulitOption>):void{
         for (let notifierStr of fnset) {
              let notifier = JSON.parse(notifierStr)
              if(notifier.dataset){event.data = notifier.dataset}
               notifier.fn.apply(this,[event,...args])
               if(event.isStopPropagation) break;
         }  
    }

}