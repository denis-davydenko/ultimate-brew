import App from './app/App.svelte';

function setViewportProperty(doc) {
  var prevClientHeight;
  function handleResize() {
    var clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight() {
      doc.style.setProperty('--vh', clientHeight * 0.01 + 'px');
      prevClientHeight = clientHeight;
    });
  }
  handleResize();
  return handleResize;
}

window.addEventListener(
  'resize',
  setViewportProperty(document.documentElement)
);

const app = new App({
  target: document.body
});

export default app;
