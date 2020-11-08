export default class IRoll {
    /**
     * direction lock threshold
     */
    readonly directionLockThreshold: number;
    /**
     * set bounce time
     */
    readonly bounceTime: number;
    /**
     * deceleration
     */
    readonly deceleration: number;
    private preventDefault;
    private useTransition;
    private useTransform;
    private bindToWrapper;
    private scope;
    private rollProxy;
    private context;
    private notify;
    constructor(wrapper: ScrollKit.ElementWrapper, options: ScrollKit.scrollOptions);
    private updateScrollOptions;
    private isSupport;
    private isSuportTransform;
    private isSuportTransition;
    private isSupportTouch;
    private addEventListener;
    private removeEventListener;
    private stopPreventDefault;
    private handleStart;
    private handleStop;
    private resize;
    private handleTransitionEnd;
    private wheel;
    private handleMove;
    protected handleEvent(e: Event): void;
    /**
     * addDOMEvents
     */
    private addEvents;
    /**
     * removeDOMEvents
     */
    private removeEvents;
    /**
     * makeDOMEvents
     */
    private initEvents;
    private initRoll;
    /**
     * initializer
     */
    private initializer;
    /**
     *
     * @param x
     * @param y
     * @param time
     * @param ease
     */
    scrollTo(x: number, y: number, time: number): void;
}
