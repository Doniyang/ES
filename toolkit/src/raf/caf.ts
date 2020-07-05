export default function cancelAnimationFrame() {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function(id) {
      window.clearTimeout(id);
    }
  );
}