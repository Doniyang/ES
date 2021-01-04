export default function isUndefined(value: any): boolean {
	return typeof value === 'undefined' && arguments.length > 0
}