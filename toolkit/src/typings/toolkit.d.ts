declare type argsOption = number | string | boolean | object

declare interface Callbackable<T> {
  (evt:T,...args:Array<argsOption>):void
}