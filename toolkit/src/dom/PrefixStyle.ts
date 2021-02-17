import Engine from "../browser/Browser";
import Node from './Node'
export default class PrefixStyle {
    static prefix():StylePrefix{
        return { trident: '-ms-', gecko: '-moz-', webkit: '-webkit-', presto: '-o-' }
    }
    static style(style: string): string {
        let key: string = Engine.Core();
        if (key === '') {
            return style
        } else {
            const prefix = this.prefix();
            return prefix[key] + style
        }
    }
    static has(style: string): boolean {
        let pseudoStyle: CSSStyleDeclaration = Node.getInstance().create().style;
        return style in pseudoStyle;
    }
}