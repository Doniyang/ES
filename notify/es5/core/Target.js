import Hash from "./Hash";
/**
 * @class Target
 * @classdesc 事件的函数的封装
 * @author niyang
 */
export default class Target {
    constructor(handler, options) {
        /**
         *@description 表示事件处理排序靠后
         */
        this.passive = false;
        /**
         * @description 事件先处理
         */
        this.capture = true;
        /**
         * @description 只会触发一次事件
         */
        this.once = false;
        this.handler = handler;
        this.passive = (options === null || options === void 0 ? void 0 : options.passive) || false;
        this.capture = (options === null || options === void 0 ? void 0 : options.capture) || true;
        this.once = (options === null || options === void 0 ? void 0 : options.once) || false;
    }
    /**
     * @description 获取处理函数名
     */
    get name() {
        return this.handler.name || '';
    }
    /**
     * @description 是否是一次性事件
     * @returns boolean
     */
    isOnlyOnce() {
        return this.once;
    }
    /**
     * @description 是否优先处理
     * @returns boolean
     */
    forward() {
        return this.capture;
    }
    /**
     * @description 是否后面处理
     * @returns boolean
     */
    backward() {
        return this.passive;
    }
    /**
     * @description 执行事件
     * @param evt ClaccEvent
     * @param args
     */
    execute(evt, ...args) {
        this.handler.apply(this, [evt, ...args]);
    }
    /**
     * @description 判断是否是同一处理函数
     * @param target Target
     * @returns
     */
    equal(target) {
        return target.name === this.name && this.hash() === target.hash();
    }
    /**
     * 判断是不是同一个target
     * @param handler
     * @param options
     * @returns boolean
     */
    is(handler, options) {
        let name = handler.name || '';
        let passive = (options === null || options === void 0 ? void 0 : options.passive) || false;
        let capture = (options === null || options === void 0 ? void 0 : options.capture) || true;
        let once = (options === null || options === void 0 ? void 0 : options.once) || false;
        let hashCode = Hash.code(handler.toString());
        return this.name === name && this.hash() === hashCode && once === this.isOnlyOnce() && capture === this.forward() && passive === this.backward();
    }
    /**
     * @description 获取hash
     * @returns Number
     */
    hash() {
        return Hash.code(this.handler.toString());
    }
}
