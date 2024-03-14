
/**
 * @description
 */
export default interface Digitalizer {
    attain(state: number): boolean;
    execute(e: Event,scope:Scope,platform:Platform): void
}
