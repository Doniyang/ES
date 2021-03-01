import RollClose from "./RollClose";
import RollProgress from "./RollProgress";
import RollRefresh from "./RollRefresh";
import RollRotate from "./RollRotate";
import RollStart from "./RollStart";
import RollStop from "./RollStop";
/**
 * @class RollFactory
 * @description create roll action
 */
export default class RollFactory {
    constructor() {
        this.store = new Map();
    }
    create(cmd) {
        let handle;
        switch (cmd) {
            case 'start':
                handle = new RollStart();
                break;
            case 'move':
                handle = new RollProgress();
                break;
            case 'stop':
                handle = new RollStop();
                break;
            case 'finish':
                handle = new RollClose();
                break;
            case 'refresh':
                handle = new RollRefresh();
                break;
            case 'wheel':
                handle = new RollRotate();
                break;
            default:
                handle = new RollStart();
                break;
        }
        if (handle !== null) {
            this.store.set(cmd, handle);
        }
        return handle;
    }
    build(cmd) {
        return this.store.has(cmd) ? this.store.get(cmd) : this.create(cmd);
    }
    destroy() {
        this.store.clear();
    }
}
