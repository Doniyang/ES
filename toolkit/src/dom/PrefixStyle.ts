import Engine from "../browser/Browser";
import Node from './Node'
export default class PrefixStyle {
    static prefix():StylePrefix{
        return { trident: 'ms', gecko: 'Moz', webkit: 'Webkit', presto: 'O' }
    }
    static style(style: string): string {
        let key: string = Engine.Core();
        if (key === '') {
            return style
        } else {
            const prefix = this.prefix();
            return prefix[key] + style.charAt(0).toUpperCase() + style.substr(1)
        }
    }
    static has(style: string): boolean {
        let pseudoStyle: CSSStyleDeclaration = Node.getInstance().create().style;
        return style in pseudoStyle;
    }
}