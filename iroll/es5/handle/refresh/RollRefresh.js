export default class RollRefresh {
    constructor() {
        this.timeId = 0;
    }
    attain(state) {
        return state === 0;
    }
    execute(e, scope, platform) {
        scope.setState(0);
        platform.trigger('refresh');
        if (scope.isOutBoundary()) {
            platform.reset();
        }
    }
}
