import RollMovingFactory from "../handle/moving/RollMovingFactory";
import RollStartFactory from "../handle/start/RollStartFactory";
import RollStopFactory from "../handle/stop/RollStopFactory";
import RollRefreshFactory from "../handle/refresh/RollRefreshFactory";
import RollDoneFactory from "../handle/done/RollDoneFactory";
import RollSpinningFactory from "../handle/spinning/RollSpinningFactory";
export default class Context {
    constructor(scope) {
        this.scope = scope;
    }
    execute(e, cmd, platform) {
        switch (cmd) {
            case 'start':
                const start = RollStartFactory.getInstance();
                if (start.attain(this.scope.getState()))
                    start.execute(e, this.scope, platform);
                break;
            case 'move':
                const move = RollMovingFactory.getInstance();
                if (move.attain(this.scope.getState()))
                    move.execute(e, this.scope, platform);
                break;
            case 'stop':
                const stop = RollStopFactory.getInstance();
                if (stop.attain(this.scope.getState()))
                    stop.execute(e, this.scope, platform);
                break;
            case 'resize':
                const refresh = RollRefreshFactory.getInstance();
                if (refresh.attain(this.scope.getState()))
                    refresh.execute(e, this.scope, platform);
                break;
            case 'done':
                const done = RollDoneFactory.getInstance();
                if (done.attain(this.scope.getState()))
                    done.execute(e, this.scope, platform);
                break;
            case 'rolling':
                const rolling = RollSpinningFactory.getInstance();
                if (rolling.attain(this.scope.getState()))
                    rolling.execute(e, this.scope, platform);
                break;
        }
    }
}
