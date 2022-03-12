export default class Kuso {
  private textColor: string
  private baseColor?: string
  private startColor?: string
  private stopColor?: string
  private min: number
  private max: number
  private minFontSize: number
  private maxFontSize: number

  constructor(cfg: BG.KusoConfig) {
    this.textColor = cfg.textColor
    this.baseColor = cfg.baseColor
    this.startColor = cfg.startColor
    this.stopColor = cfg.stopColor
    this.min = cfg.min
    this.max = cfg.max
    this.minFontSize = cfg.minFontSize
    this.maxFontSize = cfg.maxFontSize
  }

  private getClientWidth(): number {
    return document.documentElement.clientWidth || document.body.clientWidth
  }

  private getClientHeight(): number {
    return document.documentElement.clientWidth || document.body.clientWidth
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this.getClientWidth();
    canvas.height = this.getClientHeight();
    return canvas
  }

  private getContext(): CanvasRenderingContext2D | null {
    const canvas = this.createCanvas()
    if (!canvas.getContext) {
      throw new Error('浏览器不支持canvas')
    }
    return canvas.getContext('2d')
  }

  private random(min:number,max:number):number{
    return Math.round(Math.random() * (max - min) + min)
  }

  private drawBgColor(ctx:CanvasRenderingContext2D):void{ 
    const width = this.getClientWidth()
    const height = this.getClientHeight()
    if(this.startColor&&this.stopColor){
      const linearGradient =   ctx.createLinearGradient(width/2,0,width/2,height)
      linearGradient.addColorStop(0,this.startColor)
      linearGradient.addColorStop(1,this.stopColor)
      ctx.fillStyle = linearGradient
     }else{
       ctx.fillStyle = this.baseColor||'#000'
     }  
     ctx.fillRect(0,0,width,height)
     ctx.save()
  }

  private drawChar(ctx:CanvasRenderingContext2D,x:number,y:number,text:string):void{
    const fontSize = this.random(this.minFontSize,this.maxFontSize)
    ctx.font = fontSize+'px seif'
    ctx.fillText(text,x,y)
    ctx.restore()
  }

  private setRotate(ctx:CanvasRenderingContext2D,rad:number){
    ctx.rotate(rad)
    ctx.save()
  } 
  

  toBase64(){

  }
  
}