import Scope from "../scope/Scope";
import Vialog from "./Vialog";

/**
 * @class Roll
 * @classdesc some methods  of Roll
 * @author niyang
 */
export default abstract class Roll {
    /**
     * @name roll
     * @type Variate
     */
    private vialog: Vialog;

    /**
     * @description roll state
     * @see
     *      0  -   stop that it can move
     *      1 -  moving
     */
    private state: number
    /**
     * @name scope
     */
    private scope: Scope;

    /**
     * @constructor
     * @param scope
     * @param roll
     */
    constructor(scope: Scope, vialog: Vialog) {
        this.vialog = vialog
        this.state = 0
        this.scope = scope;
    }

    /**
     * @method getElement
     * @returns root element
     */
    protected getElement(): HTMLElement {
        return this.scope.getScrollElement()
    }

    /**
     * @method getScope
     */
    getScope(): Scope {
        return this.scope
    }

    /**
     * @method getState
     * @returns number
     */
    getState(): number {
        return this.state
    }

    /**
     *
     * @param state number
     */
    setState(state: number): void {
        this.state = state
    }

    /**
     * @method scrollTo
     * @param x
     * @param y
     * @param time
     * @param easing
     */
    abstract scrollTo(x: number, y: number, time: number, easing?: string | ScrollKit.Algorithm): void;

    /**
     * @method translate
     * @param x
     * @param y
     */
    translate(x: number, y: number): void {
        this.vialog.translate(x, y, this.getElement().style);
        this.scope.setPosition(x, y);
    };

    /**
     * @method getPosion
     * @description get point of scroll element
     * @returns {x,y}
     */
    getPosition(): ScrollKit.Point {
        return this.scope.getPosition();
    };

    /**
     * @method getComputedPosition
     * @description get point of scroll element
     * @returns {x,y}
     */
    getComputedPosition(): ScrollKit.Point {
        return this.vialog.getComputedPosition(this.getElement());
    };

    /**
     * @method resetPosition
     */
    resetPosition(): void {
        let time = this.scope.getBounceTime(),
            pos = this.scope.getCrisisPosition();
        this.scrollTo(pos.x, pos.y, time, this.getAnimation())
    };

    /**
     * @method stop
     */
    abstract stop(): void;

    /**
     * @method getAnimation
     * @description get anmation
     */
    abstract getAnimation(): string | ScrollKit.Algorithm
}
