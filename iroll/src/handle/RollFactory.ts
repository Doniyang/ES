import RollStart from "src/core/core/RollStart";

/**
 * @module handle
 * @class RollFactory
 * @classdesc a factory design for roll handle
 * @author niyang
 */
export default class RollFactory{
    constructor(){}
    
    builder(action){
        const handle = null
        switch (actiion) {
            case 'START':
                handle = new RollStart();
                break;
            case 'MOVE':
                handle = new RollP   
            default:
                break;
        }
    }
}