export default function isArray(value: any): value is Array<any> {
	return (typeof value == 'object') && value instanceof Array;
}