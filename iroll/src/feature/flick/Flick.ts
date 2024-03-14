import Feature from "../Feature"

export default class Flick extends Feature{
    private time:number
    private distance:number

    constructor(){
        super(true)
        this.time = 200
        this.distance = 100
    }

    /**
     * getTime
     */
    public getTime():number {
        return this.time
    }

    /**
     * getDistance
     */
    public getDistance():number {
        return this.distance
    }
}