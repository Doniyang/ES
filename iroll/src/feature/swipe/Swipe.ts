import Feature from "../Feature"

export default class Swipe extends Feature{
    private time: number
    private bounce: number

    constructor(){
        super(true)
        this.time = 2500
        this.bounce = 500
    }
}