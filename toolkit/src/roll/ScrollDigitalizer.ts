import requestAnimationFrame from '../raf/raf';
import cancelAnimationFrame from '../raf/caf';

export default class ScrollDigitalizer{
	private rootElement:HTMLElement;
	private scrollElement:HTMLElement;
    private preventDefault:boolean;
    private rollState:number;
    private useTransition:boolean;
    private useTransform:boolean;
    constructor(rootElement:HTMLElement,scrllElement:HTMLElement,preventDefault:boolean) {
    	this.rootElement=rootElement;
    	this.scrollElement=scrllElement;
    	this.preventDefault=preventDefault;
    	this.rollState=0;
    	this.useTransition=false
    	this.useTransform=false
    }
    
    private engine(): string {
    const u = navigator.userAgent
    if (u.indexOf('Trident') > -1) {
      return 'trident'
    } else if (u.indexOf('Presto') > -1) {
      return 'presto'
    } else if (u.indexOf('AppleWebKit') > -1) {
      return 'webKit'
    } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
      return 'gecko'
    } else {
      return ''
    }
  }
  
  private isBadAndroid(){
  	let appVersion = window.navigator.appVersion;
		// Android browser is not a chrome browser.
		if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
			let safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
			if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
				return parseFloat(safariVersion[1]) < 535.19;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
private prefix(): ScrollKit.Prefix {
    return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }
  }
  private prefixStyle(style: string): string {
    let key: string = this.engine();
    if (key === '') {
      return style
    } else {
      const prefix = this.prefix();
      return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1)
    }
  }

    private transitionTime(time:number){
		let durationProp:string = this.prefixStyle('transitionDuration');
		let scrollStyle:CSSStyleDeclaration = this.scrollElement.style;
		scrollStyle.setProperty(durationProp,time+'ms');

		if ( !time && this.isBadAndroid() ) {
			scrollStyle.setProperty(durationProp,'0.0001ms');
			requestAnimationFrame(()=> {
				if(scrollStyle.getPropertyValue(durationProp)=== '0.0001ms') {
					scrollStyle.setProperty(durationProp,'0s');
				}
			});
		}
    } 
    private transitionTimingFunction(easing:Function){
        let transitionTimingFunction:string = this.prefixStyle('transitionTimingFunction');
        let scrollStyle:CSSStyleDeclaration = this.scrollElement.style;
       scrollStyle.setProperty(transitionTimingFunction,easing)
    }
    

   private translate(x:number,y:number,time:number,easing:object,fn:Function){
   	this.transitionTimingFunction(easing,fn)
   }   
   
   private animate(x:number,y:number,duration:number,easingfn:Function,fn:Function){

   }
    scrollTo(x:number,y:number,time:number,easing:object,fn:Function){
       this.rollState=1
       if(this.useTransition){
          this.translate(x,y,time,easing.style,fn);
       }else{
          this._animate(x, y, time, easing.fn,fn);  
       }     
    }  
}