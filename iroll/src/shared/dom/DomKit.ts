import { isString } from "@niyang-es/toolkit";

export default class DomKit{
    static getElement(selector:RollKit.Selector):HTMLElement{
       return isString(selector)?document.body.querySelector(selector) as HTMLElement : selector  
    }

    static isSameElement(el: Element, ol: HTMLElement){
        return el.isSameNode(ol)
    }

    static offset(el:HTMLElement):RollKit.Point{
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