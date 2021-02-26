import Digitalizer from "./Digitalizer";
import RollClose from "./RollClose";
import RollProgress from "./RollProgress";
import RollRefresh from "./RollRefresh";
import RollRotate from "./RollRotate";
import RollStart from "./RollStart";
import RollStop from "./RollStop";

export default class RollFactory {
    private store: Map<string, Digitalizer>
    constructor() {
        this.store = new Map<string, Digitalizer>();
    }
    private create(cmd: string): Digitalizer {
        let handle: Digitalizer;
        switch (cmd) {
            case 'start':
                handle = new RollStart()
                break;
            case 'move':
                handle = new RollProgress()
                break;
            case 'stop':
                handle = new RollStop()
                break;
            case 'finish':
                handle = new RollClose()
                break;
            case 'refresh':
                handle = new RollRefresh()
                break;
            case 'wheel':
                handle = new RollRotate()
                break;
            default:
                handle = new RollStart()
                break;
        }
        if (handle !== null) {
            this.store.set(cmd, handle)
        }
        return handle;
    }

    build(cmd: string): Digitalizer {
        return this.store.has(cmd) ? (this.store.get(cmd) as Digitalizer) : this.create(cmd)
    }

    destroy() {
        this.store.clear()
    }
}