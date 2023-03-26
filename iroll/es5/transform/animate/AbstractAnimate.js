export default class AbstractAnimate {
    /**
     * @constructor
     * @param scope
     * @param roll
     */
    constructor(scope, roll) {
        this.roll = roll;
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
        this.roll.translate(x, y, this.getElement().style);
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
        return this.roll.getComputedPosition(this.getElement());
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
