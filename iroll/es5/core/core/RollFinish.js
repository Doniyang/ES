export default class RollFinish {
    execute(e, attrs, proxy) {
        proxy.stop();
        if (proxy.isPeak()) {
            proxy.setState(0);
            proxy.trigger('scroll:end', proxy.getPosition());
        }
        else {
            proxy.resetPosition();
        }
    }
}
