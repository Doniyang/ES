export default class StateDigitalyier<T> {
    private state:T
    constructor(defaultState:T) {
        this.state=defaultState
    }
    getState():T{
        return this.state
    }
    setState(state:T):void{
        this.state =state
    }
}