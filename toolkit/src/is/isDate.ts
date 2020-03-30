export default function isDate(value:any):boolean{
	return typeof value ==='object' && value instanceof Date
}