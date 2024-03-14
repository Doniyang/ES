import Feature from "../Feature"

export default class Bounce extends Feature{
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