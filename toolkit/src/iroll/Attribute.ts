/**
 * 定义IRoll插件的一些属性
 *  author niyang
 */

import Axis from "./Axis";

export default class Attribute {
    /**
     * 开始点
     */
    private start: Axis;
    /**
     * 移动点
     */
    private delta: Axis;
    /**
     * 位移点
     */
    private direction: Axis;

     /**
      * 开始时间，单位毫秒
      */
    private starttime:number;
     /**
      * 结束时间 单位ms
      */
    private endtime:number
    /**
     * 状态
     */
    private state:number

    constructor() {
        this.start = new Axis();
        this.delta = new Axis();
        this.direction = new Axis();
        this.starttime = 0;
        this.endtime = 0;
        this.state = 0;
    }


    getStartX(): number {
        return this.start.getAxisX();
    }

    getStartY(): number {
        return this.start.getAxisY();
    }


    getDeltaX(): number {
        return this.delta.getAxisX()
    }

    getDeltaY(): number {
        return this.delta.getAxisY()
    }


    getDirectionX():number{
        return this.direction.getAxisX();
    }
    getDirectionY():number{
        return this.direction.getAxisY();
    }

    getStartTime():number{
      return this.starttime 
    }

    getEndTime():number{
        return this.endtime;
    }

    getState():number{
        return this.state
    }

    setStart(x:number,y:number){
        this.start.setAxisX(x)
        this.start.setAxisY(y)
    }

    setDelta(x:number,y:number):void{
        this.delta.setAxisX(x)
        this.delta.setAxisY(y)
    }

    setDirection(x:number,y:number):void{
        this.direction.setAxisX(x)
        this.direction.setAxisY(y)
    }

    setStartTime(starttime:number):void{
        this.starttime = starttime 
      }
  
      setEndTime(endtime:number):void{
        this.endtime = endtime;
      }

      setState(state:number):void{
         this.state =state;   
      }

}