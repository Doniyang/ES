import Engine from "../browser/Browser";
import Node from './Node';
export default class PrefixStyle {
    static prefix() {
        return { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' };
    }
    static style(style) {
        let key = Engine.Core();
        if (key === '') {
            return style;
        }
        else {
            const prefix = this.prefix();
            return prefix[key] + style;
        }
    }
    static has(style) {
        let pseudoStyle = Node.getInstance().create().style;
        return style in pseudoStyle;
    }
}
