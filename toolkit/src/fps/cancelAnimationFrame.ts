export default function cancelAnimationFrame(rafId: number): void {
    const cancelAnimationFrame = (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            (window as any).mozCancelAnimationFrame ||
            (window as any).oCancelAnimationFrame ||
            (window as any).msCancelAnimationFrame ||
            function (id) { window.clearTimeout(id); }
    })();
    cancelAnimationFrame(rafId)
}