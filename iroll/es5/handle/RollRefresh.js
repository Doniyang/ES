export default class RollRefresh {
    constructor() { }
    isOutBoundary(prev, next) {
        return !(prev.x === next.x && prev.y === next.y);
    }
    attain(state) {
        return state === 0;
    }
    execute(e, attrs, proxy) {
        let scope = proxy.getScope();
        attrs.setEndTime(0);
        scope.setScrollDirection(0, 0);
        proxy.trigger('refresh');
        if (this.isOutBoundary(proxy.getPosition(), scope.getCrisisPosition())) {
            proxy.resetPosition();
        }
    }
}
