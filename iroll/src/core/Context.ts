import RollMovingFactory from "../handle/moving/RollMovingFactory";
import RollStartFactory from "../handle/start/RollStartFactory";
import RollStopFactory from "../handle/stop/RollStopFactory";
import RollRefreshFactory from "../handle/refresh/RollRefreshFactory";
import RollDoneFactory from "../handle/done/RollDoneFactory";
import RollSpinningFactory from "../handle/spinning/RollSpinningFactory";
export default class Context {
    private readonly scope: Scope

    constructor(scope: Scope) {
        this.scope = scope
    }

    public execute(e: Event, cmd: string, platform: Platform) {
        switch (cmd) {
            case 'start':
                const start: Digitalizer = RollStartFactory.getInstance()
                if (start.attain(this.scope.getState())) start.execute(e, this.scope, platform)
                break
            case 'move':
                const move: Digitalizer = RollMovingFactory.getInstance()
                if (move.attain(this.scope.getState())) move.execute(e, this.scope, platform)
                break
            case 'stop':
                const stop: Digitalizer = RollStopFactory.getInstance()
                if (stop.attain(this.scope.getState())) stop.execute(e, this.scope, platform)
                break
            case 'resize':
                const refresh: Digitalizer = RollRefreshFactory.getInstance()
                if (refresh.attain(this.scope.getState())) refresh.execute(e, this.scope, platform)
                break
            case 'done':
                const done: Digitalizer = RollDoneFactory.getInstance()
                if (done.attain(this.scope.getState())) done.execute(e, this.scope, platform)
                break
            case 'rolling':
                const rolling: Digitalizer = RollSpinningFactory.getInstance()
                if (rolling.attain(this.scope.getState())) rolling.execute(e, this.scope, platform)
                break

        }

    }
}   