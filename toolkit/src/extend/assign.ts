export default function assign(target:object,...sources:Array<object>){
	let to = target||{}
	sources.forEach(source=>{
		for(let key in source){
			to[key] = source[key]
		}
	})
	return to
}