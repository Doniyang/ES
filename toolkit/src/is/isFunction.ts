export default function isFunction(fn: any): boolean {
	return typeof fn === 'function' && fn instanceof Function
}