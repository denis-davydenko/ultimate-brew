let audio = new Audio('bing.mp3');
let initialized = false;

function resetAudio() {
  audio = new Audio('bing.mp3');
  audio.addEventListener('ended', resetAudio, false);
  audio.play();
  audio.pause();
  audio.currentTime = 0;
}

function initAudio() {
  if (!initialized && audio) {
    resetAudio();
    initialized = true;
    window.removeEventListener('touchstart', initAudio);
  }
}

window.addEventListener('touchstart', initAudio, false);

export function play() {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}
