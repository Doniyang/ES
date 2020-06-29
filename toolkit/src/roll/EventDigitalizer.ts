export default interface EventDigitalizer{
    execute(e:Event,context:any):void
    isAccurateState(state:number):boolean
}