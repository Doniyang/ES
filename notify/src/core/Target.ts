import Hash from "./Hash";
/**
 * @class Target
 * @classdesc 事件的函数的封装
 * @author niyang
 */
export default class Target<T>{
  /**
   *@description 表示事件处理排序靠后
   */  
  private passive:boolean = false;
  /**
   * @description 事件先处理
   */
    private capture:boolean=true;
    /**
     * @description 只会触发一次事件
     */
    private once:boolean=false;
    private handler:NotifierKit.NotifyEventCallback<T>;

    constructor(handler:NotifierKit.NotifyEventCallback<T>,options?:EventKit.AddEventListenerParms){
      this.handler = handler
      this.passive = options?.passive||false
       this.capture = options?.capture||true
       this.once = options?.once||false
    }
    /**
     * @description 获取处理函数名
     */
    public get name() : string {
      return this.handler.name||''
    }
    /**
     * @description 是否是一次性事件
     * @returns boolean
     */  
    isOnlyOnce(){
      return this.once
    }
    /**
     * @description 是否优先处理
     * @returns boolean
     */ 
    forward(){
       return this.capture  
    }
    /**
     * @description 是否后面处理
     * @returns boolean
     */ 
    backward(){
      return this.passive
    }
    /**
     * @description 执行事件
     * @param evt ClaccEvent
     * @param args 
     */ 
    execute(evt:T,...args: Array<NotifierKit.NotiyParams>){
      this.handler.apply(this,[evt,...args])
    }   
    /**
     * @description 判断是否是同一处理函数
     * @param target Target
     * @returns 
     */  
    equal(target:this){
        return target.name === this.name   && this.hash()===target.hash()
    }
     /**
      * @description 获取hash
      * @returns Number
      */ 
     hash():number{
          return Hash.code(this.handler.toString())      
     } 
}