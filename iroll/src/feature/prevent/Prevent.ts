import Feature from "../Feature";

export default class Prevent extends Feature {
    private regular: Partial<RollKit.Exception>
    constructor(){
        super(true)
        this.regular = { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/ }
    }

    private regularFilter(el:any):boolean{
        for (const key in this.regular) {
            if (this.regular[key]?.test(el[key]) ) {
                return true
            }
        }
        return false
    }

    filter(el:HTMLElement):boolean{
        if(this.isSupport()){ return this.regularFilter(el)}
        return false
    }
}