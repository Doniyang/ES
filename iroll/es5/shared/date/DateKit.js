export default class DateKit {
    static now() {
        return window.performance && window.performance.now ? window.performance.now() : +new Date();
    }
    static getTime() {
        return window.performance && window.performance.now && window.performance.timing ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
    }
}
