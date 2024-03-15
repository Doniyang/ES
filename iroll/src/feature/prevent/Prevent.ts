import Feature from "../Feature";

export default class Prevent extends Feature {
    /**
     * @name regular
     */
    private regular: Partial<RollKit.Exception>
    constructor() {
        super(true)
        this.regular = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/ }
    }
    /**
     * @method regularFilter
     * @param el 
     * @returns 
     */
    private regularFilter(el: any): boolean {
        for (const key in this.regular) {
            if (this.regular[key]?.test(el[key])) {
                return true
            }
        }
        return false
    }
    /**
     * @method filter
     * @param el 
     * @returns 
     */  
    public filter(el: HTMLElement): boolean {
        if (this.isSupport()) { return this.regularFilter(el) }
        return false
    }
}