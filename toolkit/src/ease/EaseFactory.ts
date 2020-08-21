import  Backone from './Backone';
import Bounce from './Bounce';
import Circular from './Circular';
import Elastic from './Elastic';
import Quadratic from './Quadratic';
import isString from '../is/isString';

export default class EaseFactory {
	constructor(elasic:EaseKit.easename) {
	  if(isString(elasic)){
	  	return this[elasic as string]()
	  }else{
	  	return  this.customize(elasic);
	  }
	}

	backone(){
		return new Backone();
	}

	bounce(){
		return new Bounce();
	}

	circular(){
		return new Circular();
	}

	elastic(){
		return new Elastic();
	}

	quadratic(){
		return new Quadratic();
	}
	customize(elasic){
		return elasic ;
	}
} 