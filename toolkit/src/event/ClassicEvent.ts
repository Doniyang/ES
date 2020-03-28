/** 
  *the classic event object
  *create:2020/3/13
  *author:niyang
  */
  import Eventable from './Eventable'
  export default class ClassicEvent  implements Eventable {
  	/*
     *  event  exist in DOM or not
     */
  	readonly bubbles:boolean
  	/*
  	* event can cancel or not
  	*/
  	readonly cancelable:boolean
    /**
    * event target
    */  
  	readonly target:toolkit.targetOption
    /**
    * event creatted by user or not
    */
  	readonly isTrusted:boolean
    /**
    *event type default custom
    */
  	readonly type:string
   /**
      *event create time
      */
     private timeStamp:number
    /**
    *cache event data
    */
  	private dataset:toolkit.mulitOption
  	 /**
     *stop event default prevent or not
     */
  	private defaultPrevented:boolean
     /**
     *stop all event
     */
     private immediate:boolean
     /**
     * stop event propagation
     */
     private isPropagation:boolean
      
      /**
      *event name
      */
      private name:string

     constructor(context:toolkit.targetOption,name:string) {
     	this.cancelable=false
     	this.bubbles=false
     	this.isTrusted=false
     	this.target = context
     	this.type='CustomEvent'
     	this.timeStamp= Date.now()
     	this.dataset=null
     	this.defaultPrevented=false
     	this.immediate=false
     	this.isPropagation=false
       this.name=name
     }

     /**
     *  get isPropagation value
     */
     get isStopPropagation(){
     	return this.isPropagation
     }
     /**
     * get immediate value
     */
     get isStopImmediatePropagation(){
     	return this.immediate
     }

     get data():toolkit.mulitOption{
     	return this.dataset
     }
     
     static set data(value:toolkit.mulitOption){
     	this.dataset=value
     }

     /**
      * stop  event default
      */
     public preventDefault(){
     	this.defaultPrevented = true
     }
      
     /**
        * stop all event
        */
     public stopImmediatePropagation(){
     	this.immediate=true
     }

     /**
      * sop event progation
      */
     public stopPropagation(){
     	this.isPropagation=true
     }
           
     /**
       *set event as default
       */ 
     public reset(){
     	this.dataset=null
     	this.timeStamp = Date.now()
     	this.immediate= false
     	this.defaultPrevented= false
     	this.isPropagation=false
     }
  }