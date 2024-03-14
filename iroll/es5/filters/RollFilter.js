export default class RollFilter {
    constructor() {
        this.isAttached = false;
    }
    attach(args) {
        this.isAttached = this.isSignal(args);
    }
}
