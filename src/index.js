import './css/styles.css';
import { mount } from 'svelte';
import App from './app/App.svelte';

function setViewportProperty(doc) {
  let prevClientHeight;
  function handleResize() {
    const clientHeight = doc.clientHeight;
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

mount(App, { target: document.body });
