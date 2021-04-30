import isObject from './isObject'

export default function isPlainObject(value: any): boolean {
   let ctor: any, proto: any;
   if (isObject(value) === false) return false;
   ctor = value.constructor;
   if (typeof ctor !== 'function') return false;
   proto = ctor.prototype;
   if (isObject(proto) === false) return false;
   if (proto.hasOwnProperty('isPrototypeOf') === false) {
      return false;
   }
   return true;
}

