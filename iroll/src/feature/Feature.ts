import { isBoolean, isPlainObject } from "@niyang-es/toolkit"

export default class Feature {
    [key:string]:any
    /**
     * @description is spuuort feature or not
     */
    private enabled:boolean
    constructor(enabled:boolean){
        this.enabled = enabled
    } 
     
    private merge(options:Record<string,any>){
        for(let key in options){
            this[key] = options[key]
        }
    }
    isSupport():boolean {
        return this.enabled
    }

    setSupport(enabled:boolean):void {
        this.enabled =enabled
    }

    chuck(options:Record<string,any>| boolean){
        if(isBoolean(options)){ this.setSupport(options)}
        else if(isPlainObject(options)){ this.merge(options) }
        else{ this.setSupport(false) }  
    }
}