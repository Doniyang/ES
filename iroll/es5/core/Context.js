import RollFactory from "../handle/RollFactory";
import Attribute from "../attribute/Attribute";
export default class Context {
    constructor(proxy) {
        this.attrs = new Attribute();
        this.facotry = new RollFactory();
        this.proxy = proxy;
    }
    setStart(x, y) {
        this.attrs.setOrigin(x, y);
    }
    getStartX() {
        return this.attrs.getOriginX();
    }
    getStartY() {
        return this.attrs.getOriginY();
    }
    setState(state) {
        this.attrs.setState(state);
    }
    getState() {
        return this.attrs.getState();
    }
    execute(e, cmd) {
        let handle = this.facotry.build(cmd);
        if (handle.attain(this.getState())) {
            handle.execute(e, this.attrs, this.proxy);
        }
    }
    destroy() {
        this.facotry.destroy();
    }
}
