/**
 * @class Stack
 * @classdesc 事件处理的堆栈
 */
export default class Stack {
    constructor() {
        this.map = [];
    }
    /**
     * @description   判断是否含有某个事件处理函数
     * @param target
     * @returns
     */
    has(target) {
        return this.map.some((item) => target.equal(item));
    }
    /**
     * @description 添加事件处理函数
     * @param target
     * @returns
     */
    add(target) {
        if (this.has(target)) {
            return;
        }
        if (target.forward()) {
            this.map.unshift(target);
        }
        if (target.backward()) {
            this.map.push(target);
        }
    }
    /**
     * @description 剔除某个事件处理函数
     * @param target
     */
    delete(target) {
        this.map = this.map.filter(a => target.equal(a) === false);
    }
    /**
     * @description 清空事件处理函数
     */
    clear() { this.map = []; }
    /**
     *
     * @param evt
     * @param args
     * @param filter
     */
    forEach(evt, args, filter) {
        this.map.forEach((target) => {
            if (filter.call(this, evt)) {
                target.execute(evt, ...args);
                if (target.isOnlyOnce()) {
                    this.delete(target);
                }
            }
        });
    }
}
