export default function cancelAnimationFrame(rafId) {
    const cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            function (id) { window.clearTimeout(id); };
    })();
    cancelAnimationFrame(rafId);
}
