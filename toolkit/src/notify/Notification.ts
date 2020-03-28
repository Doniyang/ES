export default abstract class Notification{
    /**
      *bind a event to some object
      */
	abstract on(name:string,fn:toolkit.fnOption,dataset?:toolkit.mulitOption):void;
    /**
     * set off event from object 
     */
	abstract off(name:string,fn:toolkit.fnOption,dataset?:toolkit.mulitOption):void;

	/**
	 *has something
	 */
	abstract has(name:string,fn:toolkit.fnOption,dataset?:toolkit.mulitOption):boolean;

	/**
	  * clean all notice
	  */
	 abstract clean():void

	 /**
	  *notify event
	  */
	 abstract notify(name:string,...args:Array<toolkit.mulitOption>):void 
}