export default interface Rollable{
    execute(e: Event, context: any, proxy: any): void
    attainState(state: number): boolean
}