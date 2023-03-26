import { isString } from "@niyang-es/toolkit";

export default class DomKit{
    static getElement(selector:ScrollKit.ElementWrapper):HTMLElement{
       return isString(selector)?document.body.querySelector(selector) as HTMLElement : selector  
    }

    static offset(el:HTMLElement):ScrollKit.Point{
        let left = 0,top = 0;
        while(el){
            left -= el.offsetLeft
            top -= el.offsetTop
            el = el.offsetParent as HTMLElement
        }

        return {
          x: left,
          y: top
        }
    }
}