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
        if (this.timeId)
            clearTimeout(this.timeId);
        this.timeId = setTimeout(() => {
            platform.reset();
        }, scope.getResizePolling());
    }
}
