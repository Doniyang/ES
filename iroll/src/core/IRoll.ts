import { ClassicEvent } from "@niyang-es/notify";
import { DomKit } from "../shared";
import Scope from "./Scope";
import Context from "./Context";
import Platform from "../platform/Platform";

export class IRoll {

    private scope: Scope;
    private context: Context;
    private platform: Platform;

    constructor(el: RollKit.Selector, options: RollKit.Options) {
        this.scope = new Scope(DomKit.getElement(el))
        this.context = new Context(this.scope)
        this.platform = new Platform(this.scope)
        this.initializer(options)
    }
    /**
     * @description update roll settings
     * @param options 
     */
    private initializer(options: RollKit.Options) {
        this.scope.merge(options)
        this.attach()
        const pos: RollKit.Point = this.scope.getZeta()
        this.scrollTo(pos.x,pos.y,0)
    }

    private isSupportTouch(): boolean {
        return 'ontouchstart' in window
    }

    private addEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture?: boolean | AddEventListenerOptions) {
        el.addEventListener(type, fn, capture);
    }

    private removeEventListener(el: HTMLElement, type: string, fn: EventListenerOrEventListenerObject, capture?: boolean | EventListenerOptions) {
        el.removeEventListener(type, fn, capture)
    }

    private attach() {
        this.at(this.addEventListener, true)
    }

    private detach() {
        this.at(this.removeEventListener, false)
    }

    private at(listener: RollKit.EventListener, passive: boolean) {
        const rootElement: HTMLElement = this.scope.getRootElement();
        const target: HTMLElement | Window = this.scope.isFocusOnWrap() ? rootElement : window;
        let captureOptions: AddEventListenerOptions = { capture: false }
        listener(window, 'orientationchange', this)
        listener(window, 'resize', this)

        if (this.scope.isSupportClick()) {
            listener(rootElement, 'click', this.dispatch.bind(this), true)
        }
        /**
         * mouse
         *  */
        if (!this.isSupportTouch()) {
            listener(rootElement, 'mousedown', this.dispatch.bind(this))
            listener(target, 'mousemove', this.dispatch.bind(this))
            listener(target, 'mousecancel', this.dispatch.bind(this))
            listener(target, 'mouseup', this.dispatch.bind(this))
        }
        /**
         *  touch
         * */
        if (this.isSupportTouch()) {
            if (passive) { captureOptions.passive = false }
            listener(rootElement, 'touchstart', this.dispatch.bind(this), captureOptions)
            listener(target, 'touchmove', this.dispatch.bind(this), captureOptions)
            listener(target, 'touchcancel', this.dispatch.bind(this), captureOptions)
            listener(target, 'touchend', this.dispatch.bind(this), captureOptions)
        }

        if (this.scope.isSupportWheel()) {
            listener(rootElement, 'wheel', this.dispatch.bind(this));
            listener(rootElement, 'mousewheel', this.dispatch.bind(this));
            listener(rootElement, 'DOMMouseScroll', this.dispatch.bind(this));
        }


        listener(this.scope.getRollElement(), 'transitionend', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'webkitTransitionEnd', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'oTransitionEnd', this.dispatch.bind(this));
        listener(this.scope.getRollElement(), 'MSTransitionEnd', this.dispatch.bind(this));
    }


    private dispatch(e: Event) {
        switch (e.type) {
            case 'touchstart':
            case 'mousedown':
                this.handleStart(e);
                break;
            case 'touchmove':
            case 'mousemove':
                this.handleMoving(e);
                break;
            case 'touchend':
            case 'mouseup':
            case 'touchcancel':
            case 'mousecancel':
                this.handleStop(e);
                break;
            case 'orientationchange':
            case 'resize':
                this.resize(e);
                break;
            case 'transitionend':
            case 'webkitTransitionEnd':
            case 'oTransitionEnd':
            case 'MSTransitionEnd':
                this.handleDone(e);
                break;
            case 'wheel':
            case 'DOMMouseScroll':
            case 'mousewheel':
                this.handleMouseWheel(e);
                break;
            case 'click':
                this.handleClick(e);
                break;
            default:
                break;
        }
    }
    private handleStart(e: Event) {
        this.context.execute(e, 'start', this.platform)
    }

    private handleMoving(e: Event) {
        this.context.execute(e, 'move', this.platform)
    }

    private handleStop(e: Event) {
        this.context.execute(e, 'stop', this.platform)
    }

    private resize(e: Event) {
        this.context.execute(e, 'resize', this.platform)
    }

    private handleMouseWheel(e: Event) {
        this.context.execute(e, 'rolling', this.platform)
    }

    private handleDone(e: Event) {
        this.context.execute(e, 'done', this.platform)
    }

    private handleClick(e: Event) {
        e.stopPropagation()
        e.preventDefault()
    }
    /**
     * 
     * @param name 
     * @param fn 
     */
    public on(name: string, fn: RollKit.NotifyCallback<ClassicEvent>) {
        this.platform.on(name, fn)
    }

    /**
     * off
     */
    public off(name: string, fn?: RollKit.NotifyCallback<ClassicEvent>) {
        this.platform.off(name, fn)
    }
     
    /**
     * scrollToElement
     */
    public scrollToElement(el:string|HTMLElement, time:number, offsetX:boolean|number, offsetY:boolean|number, easing?:RollKit.Animation):void {
        if (!el) {return void 0 }
        const rootElement = this.scope.getRootElement()
        const node = DomKit.getElement(el)
      
          let pos = DomKit.offset(node)
          const wrap = DomKit.offset(rootElement)
          let newX = pos.x -  wrap.x

          let newY = pos.y - wrap.y
          // if offsetX/Y are true we center the element to the screen
          if (offsetX === true) {
            offsetX = Math.round(node.offsetWidth / 2 - rootElement.offsetWidth / 2)
          }
          if (offsetY === true) {
            offsetY = Math.round(node.offsetHeight / 2 - rootElement.offsetHeight / 2);
          }
      
          newX  -= offsetX || 0
          newY -= offsetY || 0

          newX  =  Math.max(this.scope.getMaxScrollX(),Math.min(0,newX))
          newY = Math.max(this.scope.getMaxScrollY(),Math.min(0,newY))
          this.scrollTo(newX, newY, time, easing);
    }
    /**
     * scrollTo
     */
    public scrollTo(x: number, y: number, time: number, ease?: RollKit.Animation) {
        this.platform.scrollTo(x, y, time, ease)
    }
    /**
     * translate
     */
    public translate(x:number,y:number) {
        this.platform.translate(x,y)
    }

    /**
     * destory
     */
    public destory() {
       this.platform.destory()
       this.detach()
    }

}