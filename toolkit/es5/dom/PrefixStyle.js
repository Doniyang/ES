import Engine from "../browser/Browser";
import Node from './Node';
export default class PrefixStyle {
    static prefix() {
        return { trident: 'ms', gecko: 'Moz', webkit: 'webkit', presto: 'O' };
    }
    static style(style) {
        let key = Engine.Core();
        if (key === '') {
            return style;
        }
        else {
            const prefix = this.prefix();
            return '-' + prefix[key].toLowerCase() + '-' + style;
        }
    }
    static jsStyle(style) {
        let key = Engine.Core();
        if (key === '') {
            return style;
        }
        else {
            const prefix = this.prefix();
            return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1);
        }
    }
    static has(style) {
        let pseudoStyle = Node.getInstance().create().style;
        return style in pseudoStyle;
    }
}
