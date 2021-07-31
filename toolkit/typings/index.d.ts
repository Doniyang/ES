interface Fortran<T> {
    (value: any): value is T
}
interface Factory {
    style(): string;
    algorithm(k: number): number
}

interface Queue<T> {
    push(item: T): void;
    pop(): T;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): T;
    getRear(): T;
}

export declare const isArray: Fortran<Array<any>>;
export declare const isBoolean: Fortran<boolean>
export declare const isDate: Fortran<Date>
export declare const isFunction: Fortran<Function>
export declare const isNumber: Fortran<number>
export declare const isNull: Fortran<null>
export declare const isString: Fortran<string>
export declare const isEmptyString: Fortran<string>
export declare const isUndefined: Fortran<unknown>
export declare const isObject: Fortran<Object>
export declare const isPlainObject: Fortran<Object>


export declare class Broswer {
    static Core(): string
}

export declare class PrefixStyle {
    static prefix(): StylePrefix
    static style(style: string): string
    static jsStyle(style: string): string
    static has(style: string): boolean
}
export declare class Backone implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class Bounce implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class Circular implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class EaseOutQuard implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class EaseOutQuart implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class EaseOutQuint implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class Elastic implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class Quadratic implements Factory {
    style(): string;
    algorithm(k: number): number
}
export declare class ArrayQueue<T> implements Queue<T>{
    push(item: T): void;
    pop(): T;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): T;
    getRear(): T;
}
export declare class LinkedQueue<T> implements Queue<T>{
    push(item: T): void;
    pop(): T;
    size(): number;
    clear(): void;
    isEmpty(): boolean;
    getFront(): T;
    getRear(): T;
}
export declare function requestAnimationFrame(rafCallback: FrameRequestCallback): number;
export declare function cancelAnimationFrame(rafId: number): void;
export declare function assign(target: object, ...source: Array<object>): object;
export declare function ensure(value: any, def: Array<any>): Array<any>;
export declare function group(ary:Array<any>,key:string,sort:CompareCallback):Array<Array<any>>;