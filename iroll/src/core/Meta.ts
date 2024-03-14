import { PrefixStyle } from '@niyang-es/toolkit'
import { EventPassthrough } from "../shared"
import MouseeWheel from "../feature/mouse/MouseeWheel"
import Momentum from "../feature/momentum/Momentum"
import Swipe from "../feature/swipe/Swipe"
import Flick from "../feature/flick/Flick"
import Bounce from "../feature/bounce/Bounce"
import Prevent from "../feature/prevent/Prevent"

export default class Meta{
    [key:string]: any
    private startX:number
    private startY:number
    private directionLockThreshold:number
    private eventPassthrough:string
    private bounce:Bounce
    private swipe: Swipe
    private flick:Flick
    private resizePolling:number
    private probeType: number
    
    private scrollX:boolean
    private scrollY:boolean
    private click:boolean   
    private tap: boolean
    private momentum:Momentum
    private prevent: Prevent
    private HWCompositing: boolean
    private useTransition: boolean
    private useTransform: boolean
    private bindToWrapper: boolean
    private mouseWheel: MouseeWheel
    private snap: boolean
    private zoom: boolean
    private stopPropagation:boolean
    
    constructor(){
        this.startX = 0
        this.startY = 0
        this.scrollX= false
        this.scrollY =  true
        this.directionLockThreshold = 5
        this.eventPassthrough = EventPassthrough.None
        this.click = false
        this.tap = false
        this.bounce = new Bounce()
        this.momentum = new Momentum()
        this.swipe = new Swipe()
        this.flick = new Flick() 
        this.resizePolling = 60
        this.probeType = 0
        this.prevent =new Prevent()
        this.HWCompositing =true
        this.useTransition =true
        this.useTransform = true
        this.bindToWrapper = false
        this.mouseWheel = new MouseeWheel()
        this.snap = false
        this.zoom= false  
        this.stopPropagation = false
    }

    public chuck(options?:RollKit.Options) {
        if(!options){ return this }
        for (let key in options) { 
            if(['bounce','momentum','swipe','flick','mouseWheel','prevent'].includes(key)){ this[key].chuck(options[key]) }
            else {this[key] = options[key] }
        }   
        return this
    }

    public ready(){
       if(this.isSupportPrevent()){
          this.prevent.setSupport(this.eventPassthrough === EventPassthrough.None)
       } 
       this.scrollX = this.eventPassthrough === EventPassthrough.Horizontal? false : this.scrollX
        this.scrollY = this.eventPassthrough === EventPassthrough.Vertical ? false : this.scrollY
        this.directionLockThreshold = [EventPassthrough.Horizontal,EventPassthrough.Vertical].some(cde=> cde === this.eventPassthrough) ? 0 : this.directionLockThreshold  
    }
    
    public getProbeType():number {
        return this.probeType
    }
    /**
      * getFlickLimitTime
      */
    public getFlickLimitTime():number {
        return this.flick.getTime()
     }

     /**
      * getFlickLimitdistance
      */
     public getFlickLimitdistance():number {
        return this.flick.getDistance()
     }
    /**
     * @type getDirectionLockThreshold
     */
    public getDirectionLockThreshold():number {
        return this.directionLockThreshold
    }
    
   
    /**
     * getMomentunLimitDistance
     */
    public getMomentunLimitDistance():number {
        return this.momentum.getDistance()
    }

     /**
     * getMomentunLimitDistance
     */
    public getMomentunLimitTime():number {
        return this.momentum.getTime()
    }
    /**
     * @method calculation
     */
    public calculation(destination: number, start: number, time: number, margin: number, size: number): RollKit.Momentum{
        return this.momentum.calculation(destination,start,time,margin,size)
    }

    /**
     * getResizePolling
     */
    public getResizePolling():number {
        return this.resizePolling
    }

    /**
     * getMouseWheelSpeed
     *  
     */
    public getMouseWheelSpeed():number {
        return this.mouseWheel.getSpeed()
    }
    /**
     * getMouseWheelFactor
     * @returns 
     */
    public getMouseWheelFactor():number {
        return this.mouseWheel.getFactor()
    }

    /**
     * getMouseWheelTime
     */
    public getMouseWheelTime():number {
        return this.mouseWheel.getTime()
    }

    /**
     * getBounceTime
     */
    public getBounceTime():number {
        return this.bounce.getTime()
    }
    /**
     * isAutoScroll
     */
    public isAutoScroll():boolean {
        return this.scrollX && this.scrollY && this.eventPassthrough === EventPassthrough.None
    }
    /**
     * @method isHorizontalScroll
     */
    public isHorizontalScroll():boolean{
        return this.scrollX
    }
    /**
     * @method isVerticalScroll
     */
    public isVerticalScroll():boolean{
        return this.scrollY
    }
    /**
     * isSupportTransition
     */
    public isSupportTransition() {
        return this.useTransition && PrefixStyle.has('transition')
    }

    /**
     * isSupportTransform
     */
    public isSupportTransform() {
        return this.useTransform && PrefixStyle.has('transform')
    }


    /**
     * isSupportHardFast
     */
    public isSupportHardFast() {
        return this.HWCompositing
    }

    /**
     * isSpuuort3D
     */
    public isSpuuort3D() {
        return PrefixStyle.has('perspective')
    }
    /**
     * isFocusOnWrap
     */
    public isFocusOnWrap() {
        return this.bindToWrapper
    }

    /**
     *wheel
     */
    public isSupportWheel() {
        return this.mouseWheel.isSupport()
    }
     
    public isSupportPrevent(){
        return this.prevent.isSupport()
    }

    /**
     * isSupportBouce
     */
    public isSupportBouce():boolean {
      return this.bounce.isSupport()    
    }

    /**
     * @type isPreventScrollX
     */
    public isPreventScrollX():boolean {
        return this.eventPassthrough === EventPassthrough.Horizontal
    }
    
    /**
     * @type isPreventScrollY
     */
    public isPreventScrollY():boolean {
        return this.eventPassthrough === EventPassthrough.Vertical
    } 

    /**
     *  isStopPropagation():boolean;
     */
    public isStopPropagation():boolean {
        return this.stopPropagation;
    }
     /**
     * @returns boolean
     */
     public isSupportClick():boolean {
        return this.click
    }
    
    /**
     * isSupportTap
     */
    public isSupportTap() {
        return this.tap
    }

     /**
      * isSupportFlick
      */
     public isSupportFlick() {
        return this.flick.isSupport()
     }
      /**
     * isSupportMomentum
     */
    public isSupportMomentum():boolean {
        return this.momentum.isSupport()
    }

     /**
      * isSupportSnap
      */
     public isSupportSnap():boolean {
        return this.snap
     }
    
}