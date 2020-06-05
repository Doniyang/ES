export default interface EventDigitalizer<T>{
    execute(e:Event,context:T):void
}