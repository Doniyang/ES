import  Easeble from './Easeble';

export default class Customic implements Easeble{
  private stylesheet:EaseKit.EaseOptions;
  constructor(optios:EaseKit.EaseOptions){
     this.stylesheet =optios 
  }
  get style(){
  	return this.stylesheet.style;
  }
  priority(k:number):number{
      return this.stylesheet.fn(k); 
  }
}

