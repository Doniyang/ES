export function group(ary:Array<any>,key:string,sort:CompareCallback):Array<Array<any>> {
    return Array.from(new Set(ary.map(data=>data[key]))).sort(sort).reduce((a,c)=>{
        a.push(ary.filter(item=>item[key] ===c))
        return a
    },[])
}