export const requestAnimationFrame = (function () {
  let start = 0;
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback: Function) {
      const now = Date.now();
      const delay = Math.max(0, 16.7 - (now - start));
      let tId = window.setTimeout(function () {
        callback(now + delay);
      }, delay);
      start = now + delay;
      return tId;
    }
  );
})();

export const cancelAnimationFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id);
    }
  );
})()