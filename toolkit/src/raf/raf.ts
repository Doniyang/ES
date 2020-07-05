export default function requestAnimationFrame() {
  let lastTime = 0;
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(callback:Function) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      let id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    }
  );
};