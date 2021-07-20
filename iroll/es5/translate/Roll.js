/**
 * @class Roll
 * @classdesc some methods  of Roll
 * @author niyang
 */
export default class Roll {
    /**
     * @constructor
     * @param scope
     * @param roll
     */
    constructor(scope, vialog) {
        this.vialog = vialog;
        this.state = 0;
        this.scope = scope;
    }
    /**
     * @method getElement
     * @returns root element
     */
    getElement() {
        return this.scope.getScrollElement();
    }
    /**
     * @method getScope
     */
    getScope() {
        return this.scope;
    }
    /**
     * @method getState
     * @returns number
     */
    getState() {
        return this.state;
    }
    /**
     *
     * @param state number
     */
    setState(state) {
        this.state = state;
    }
    /**
     * @method translate
     * @param x
     * @param y
     */
    translate(x, y) {
        this.vialog.translate(x, y, this.getElement().style);
        this.scope.setPosition(x, y);
    }
    ;
    /**
     * @method getPosion
     * @description get point of scroll element
     * @returns {x,y}
     */
    getPosition() {
        return this.scope.getPosition();
    }
    ;
    /**
     * @method getComputedPosition
     * @description get point of scroll element
     * @returns {x,y}
     */
    getComputedPosition() {
        return this.vialog.getComputedPosition(this.getElement());
    }
    ;
    /**
     * @method resetPosition
     */
    resetPosition() {
        let time = this.scope.getBounceTime(), pos = this.scope.getCrisisPosition();
        this.scrollTo(pos.x, pos.y, time, this.getAnimation());
    }
    ;
}
