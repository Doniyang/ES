export default class RollRefresh {
    execute(e, attrs, proxy) {
        attrs.setEndTime(0);
        attrs.setDirection(0, 0);
        if (!proxy.isPeak()) {
            proxy.resetPosition();
        }
    }
}
