export default function requestAnimationFrame(rafCallback: FrameRequestCallback) {
      const requestAnimationFrame = (function () {
            let start = 0;
            return window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  (window as any).mozRequestAnimationFrame ||
                  (window as any).oRequestAnimationFrame ||
                  (window as any).msRequestAnimationFrame ||
                  function (callback: FrameRequestCallback) {
                        const now = Date.now();
                        const delay = Math.max(0, 16.7 - (now - start));
                        let tId = window.setTimeout(function () { callback(now + delay); }, delay);
                        start = now + delay;
                        return tId;
                  }
      })();
      return requestAnimationFrame(rafCallback)
}