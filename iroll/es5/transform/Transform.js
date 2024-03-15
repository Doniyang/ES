import { PrefixStyle } from "@niyang-es/toolkit";
export default class Transform {
    constructor(scope) {
        this.scope = scope;
    }
    getComputedPosition() {
        let marix = window.getComputedStyle(this.scope.getRollElement(), null);
        let x = 0, y = 0;
        let transform = marix.getPropertyValue(PrefixStyle.style('transform')) || marix.getPropertyValue('transform');
        let matrixs = transform.split(')')[0].split(', ');
        x = +(matrixs[12] || matrixs[4]);
        y = +(matrixs[13] || matrixs[5]);
        return { x, y };
    }
    translate(x, y) {
        const ruleKey = 'transform';
        const transform = PrefixStyle.style(ruleKey);
        const translateZ = this.scope.isSupportHardFast() ? 'translateZ(0)' : '';
        const rollElement = this.scope.getRollElement();
        const rule = `translate(${x}px,${y}px) ${translateZ}`;
        rollElement.style.setProperty(transform, rule);
        rollElement.style.setProperty(ruleKey, rule);
        this.scope.setZeta(x, y);
    }
}
