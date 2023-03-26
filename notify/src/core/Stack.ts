import Target from "./Target";
/**
 * @class Stack
 * @classdesc 事件处理的堆栈
 */
export default class Stack<T>{
  /**
   *@description 缓存事件对象 
   */ 
  private map:Array<Target<T>>;

   constructor(){
     this.map=[]
   }
   /**
    * @description   判断是否含有某个事件处理函数
    * @param target 
    * @returns 
    */
   has(target:Target<T>):boolean{
     return this.map.some((item:Target<T>)=>target.equal(item))  
   }

   /**
    * @description 添加事件处理函数
    * @param target 
    * @returns 
    */ 
   add(target:Target<T>):void{
      if (this.has(target)){return ;}
      if(target.forward()){this.map.unshift(target)}
      if(target.backward()){this.map.push(target)}     
   }
   /**
    * 
    * @param handler 
    * @param options 
    * @returns 
    */
   includes(handler:NotifierKit.NotifyEventCallback<T>,options?:EventKit.AddEventListenerParms):boolean{
      return this.map.some(target=>target.is(handler,options))
   }
  
   /**
    * @description 删除
    * @param handler 
    * @param options 
    */
  remove(handler:NotifierKit.NotifyEventCallback<T>,options?:EventKit.AddEventListenerParms){
    this.map = this.map.filter(target=>!target.is(handler,options))
  }
   /**
    * @description 剔除某个事件处理函数
    * @param target 
    */
   delete(target:Target<T>){
     this.map = this.map.filter(a=>!target.equal(a))   
   }

   /**
    * @description 清空事件处理函数
    */  
   clear(){ this.map = [] }
   /**
    * 
    * @param evt 
    * @param args 
    * @param filter 
    */
   forEach(evt:T,args: Array<NotifierKit.NotiyParams>,filter:EventKit.EventFilter<T>){
    this.map.forEach((target:Target<T>)=>{
       if(filter.call(this,evt)){
         target.execute(evt,...args)
         if(target.isOnlyOnce()){this.delete(target)}
       }    
    })
   }
}