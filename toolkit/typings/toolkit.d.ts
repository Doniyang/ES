declare interface StylePrefix{
  [key:string]:string
}

declare interface CompareCallback{
  (a:any,b:any):number
}

declare interface MapCallback{
  (element:any,...data:Array<any>):any
}