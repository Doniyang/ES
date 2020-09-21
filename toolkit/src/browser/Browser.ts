export default class Browser {
    static Core() {
        const u = navigator.userAgent
        if (u.indexOf('Trident') > -1) {
            return 'trident'
        } else if (u.indexOf('Presto') > -1) {
            return 'presto'
        } else if (u.indexOf('AppleWebKit') > -1) {
            return 'webkit'
        } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
            return 'gecko'
        } else {
            return ''
        }
    }
} 