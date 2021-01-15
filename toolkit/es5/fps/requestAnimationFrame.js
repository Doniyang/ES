export default function requestAnimationFrame(rafCallback) {
    const requestAnimationFrame = (function () {
        let start = 0;
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                const now = Date.now();
                const delay = Math.max(0, 16.7 - (now - start));
                let tId = window.setTimeout(function () { callback(now + delay); }, delay);
                start = now + delay;
                return tId;
            };
    })();
    return requestAnimationFrame(rafCallback);
}
