export default abstract class RollFilter{
    protected isAttached:boolean;

    constructor(){
        this.isAttached = false
    }


    protected abstract isSignal(args:unknown):boolean
    /**
     * doFilter
     */
    public abstract doFilter(args: unknown):void;

    /**
     * attach
     */
    public attach<T>(args:T) {
        this.isAttached = this.isSignal(args)
    }
}