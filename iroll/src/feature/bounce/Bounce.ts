import Feature from "../Feature"

export default class Bounce extends Feature{
    /**
     * @name time
     */
    private time:number

    constructor(){
        super(true)
        this.time = 800
    }

    /**
     * getTime
     */
    public getTime():number {
        return this.time
    }
}