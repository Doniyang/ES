import { PrefixStyle } from "@niyang-es/toolkit";
export default class Transform {
    constructor(HWCompositing) {
        this.HWCompositing = HWCompositing;
    }
    isSupportPerspective() {
        return PrefixStyle.has(PrefixStyle.jsStyle('perspective')) || PrefixStyle.has('perspective');
    }
    isSupportQuicken() {
        return this.HWCompositing && this.isSupportPerspective();
    }
    translate(x, y, scrollStyle) {
        let transform = PrefixStyle.style('transform');
        let translateZ = this.isSupportQuicken() ? 'translateZ(0)' : '';
        scrollStyle.setProperty(transform, `translate(${x}px,${y}px) ${translateZ}`);
        scrollStyle.setProperty('transform', `translate(${x}px,${y}px) ${translateZ}`);
    }
    getComputedPosition(el) {
        let marix = window.getComputedStyle(el, null);
        let x = 0, y = 0;
        let transform = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform');
        let matrixs = transform.split(')')[0].split(', ');
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return { x, y };
    }
}
