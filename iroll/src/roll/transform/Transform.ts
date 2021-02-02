import { PrefixStyle } from "@niyang-es/toolkit";
import Variate from "../Variate";

export default class Transform implements Variate {

    private HWCompositing: boolean;

    constructor() {
        this.HWCompositing = true
    }

    private isSupportPerspective(): boolean {
        return PrefixStyle.style('perspective') in document.createElement('div').style
    }

    private isSupportQuicken():boolean {
        return this.HWCompositing && this.isSupportPerspective()
    }

    translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void {
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isSupportQuicken() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
    }
}