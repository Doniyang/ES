export default class Transition {
    /**
     * 状态
     */
    private state;
    /**
     *transition
     */
    constructor();
    private isBadAndroid;
    getState(): number;
    setState(state: number): void;
    duration(time: number | undefined, scrollStyle: CSSStyleDeclaration): void;
    timing(style: string, scrollStyle: CSSStyleDeclaration): void;
}
