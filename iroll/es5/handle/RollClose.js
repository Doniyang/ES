export default class RollClose {
    isOutBoundary(prev, next) {
        return !(prev.x === next.x && prev.y === next.y);
    }
    isSameElement(el, ol) {
        return el.isSameNode(ol);
    }
    attain(state) {
        return state === 0;
    }
    execute(e, attrs, proxy) {
        let scope = proxy.getScope();
        if (!this.isSameElement(e.target, scope.getScrollElement()) && proxy.getState() === 1) {
            return void 0;
        }
        proxy.stop();
        if (this.isOutBoundary(proxy.getPosition(), scope.getCrisisPosition())) {
            proxy.resetPosition();
        }
        else {
            proxy.setState(0);
            proxy.trigger('scroll:end', proxy.getPosition());
        }
    }
}
