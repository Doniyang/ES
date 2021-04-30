import {PrefixStyle} from "@niyang-es/toolkit";
import Variate from "../Variate";

export default class Transform implements Variate {

    private HWCompositing: boolean;

    constructor(HWCompositing: boolean) {
        this.HWCompositing = HWCompositing
    }

    private isSupportPerspective(): boolean {
        return PrefixStyle.has(PrefixStyle.style('perspective'))
    }

    private isSupportQuicken(): boolean {
        return this.HWCompositing && this.isSupportPerspective()
    }

    translate(x: number, y: number, scrollStyle: CSSStyleDeclaration): void {
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isSupportQuicken() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
    }

    getComputedPosition(el: HTMLElement): ScrollKit.Point {
        let marix: CSSStyleDeclaration = window.getComputedStyle(el, null);
        let x = 0, y = 0;
        let transform: string = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform')
        let matrixs: string[] = transform.split(')')[0].split(', ')
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return {x, y}
    }
}
