export default class {
    readonly up:number;
    readonly down:number;
    //位置
    private point:number;
    //开始位置
    private start:number;
    //时间
    private time:number;
    //容器尺寸
    private size:number;
    //
    private deceleration:number;
    
    /**
     *
     */
    constructor(current:number,start:number,time:number,size:number) {
        this.up=1;
        this.down = -1
        this.point = current;
        this.start= start
        this.time=time
        this.size = size
        this.deceleration = 0.0006
    }
    getDefaultDistance():number{
        return this.point - this.start
    }
    getSpeed():number{
        return Math.abs(this.getDefaultDistance())/this.time 
    }

    getDestination():number{

    }

    getDuration():number{}
    
    setDeceleration(deceleration:number):void{
      this.deceleration = deceleration
    }
    getDeceleration():number{
        return this.deceleration
    }
}