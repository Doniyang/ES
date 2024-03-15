export default class Position {
    constructor(scope) {
        this.scope = scope;
    }
    getComputedPosition() {
        let marix = window.getComputedStyle(this.scope.getRollElement(), null);
        let x = 0, y = 0;
        x = +marix.getPropertyValue('left').replace(/[^-\d.]/g, '');
        y = +marix.getPropertyValue('top').replace(/[^-\d.]/g, '');
        return { x, y };
    }
    translate(x, y) {
        const rollElement = this.scope.getRollElement();
        rollElement.style.setProperty('left', x + 'px');
        rollElement.style.setProperty('top', y + 'px');
        this.scope.setZeta(x, y);
    }
}
