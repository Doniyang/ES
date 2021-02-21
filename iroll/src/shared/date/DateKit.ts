export default class DateKit {
    public static now(): number {
        return window.performance && window.performance.now ? window.performance.now() : +new Date()
    }

    public static getTime() {
        return window.performance &&
            window.performance.now &&
            window.performance.timing
            ? window.performance.now() + window.performance.timing.navigationStart
            : +new Date()
    }
}