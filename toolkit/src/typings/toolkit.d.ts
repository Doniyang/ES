type argsOption = null|number|string|boolean|object
type targetOptions = null|object
type fun=(...args:Array<argsOption>)=>void 
declare interface NotifierOptions{
	dataset?:argsOption
	fn:fun
}

declare interface MapSetOptions<T extends string> extends Set<string>{}

declare interface EventMapOptions<K extends string,MapSetOptions> extends Map<K,MapSetOptions>{}
declare namespace toolkit{
export  type targetOption = targetOptions
export type mulitOption = argsOption
export  type fnOption= fun
}