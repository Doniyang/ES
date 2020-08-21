export default interface EventDigitalizer {
    execute(e: Event, context: any, proxy: any): void
    isAccurateState(state: number): boolean
}