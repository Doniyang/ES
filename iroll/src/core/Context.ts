import RollFactory from "../handle/RollFactory";
import Attribute from "../attribute/Attribute";
import Digitalizer from "../handle/Digitalizer";
import RollProxy from "../translate/RollProxy";

export default class Context {
    private attrs: Attribute;
    private facotry: RollFactory;
    private proxy: RollProxy;

    constructor(proxy: RollProxy) {
        this.attrs = new Attribute();
        this.facotry = new RollFactory();
        this.proxy = proxy;
    }

    setStart(x: number, y: number) {
        this.attrs.setOrigin(x, y)
    }

    getStartX(): number {
        return this.attrs.getOriginX()
    }

    getStartY(): number {
        return this.attrs.getOriginY()
    }

    setState(state: number) {
        this.attrs.setState(state)
    }

    getState(): number {
        return this.attrs.getState()
    }

    execute(e: Event, cmd: string) {
        let handle: Digitalizer = this.facotry.build(cmd)
        if (handle.attain(this.getState())) {
            handle.execute(e, this.attrs, this.proxy)
        }
    }

    destroy() {
        this.facotry.destroy()
    }
}
