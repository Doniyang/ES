type argsOption = null|number|string|boolean|object
type targetOptions = null|object
type fun=(...args:Array<argsOption>)=>void 
declare interface NotifierOptions{
	dataset?:argsOption
	fn:fun
}

declare interface MapSetOptions<T extends string> extends Set<string>{}

declare interface EventMapOptions<K extends string,MapSetOptions> extends Map<K,MapSetOptions>{}


declare class EventNotifier{
  	readonly bubbles:boolean
  	readonly cancelable:boolean
  	readonly target:targetOptions
  	readonly isTrusted:boolean
  	readonly type:string
    private timeStamp:number
  	private dataset:argsOption
  	private defaultPrevented:boolean
    private immediate:boolean
    private isPropagation:boolean
    private name:string

     constructor(context:null|object,name:string) {}
     get isStopPropagation():boolean
     get isStopImmediatePropagation():boolean

     get data():argsOption
     
     set data(value:argsOption)
     public preventDefault():void
     public stopImmediatePropagation():void
     public stopPropagation():void
     public reset():void
}

export declare namespace toolkit{
  type targetOption = targetOptions
  type mulitOption = argsOption
  type fnOption= fun
}