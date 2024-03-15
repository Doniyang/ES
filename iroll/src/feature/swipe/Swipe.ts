import Feature from "../Feature"

export default class Swipe extends Feature{
    /**
     * @name time
     */
    private time: number
    /**
     * @name bounce
     */
    private bounce: number

    constructor(){
        super(true)
        this.time = 2500
        this.bounce = 500
    }
}