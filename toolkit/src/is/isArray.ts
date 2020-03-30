export default function isArray(value:any):boolean{
	return (typeof value=='object')&&value instanceof  Array;
}