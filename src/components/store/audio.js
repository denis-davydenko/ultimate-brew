const audio = new Audio('bing.mp3');
let initialized = false;

function initAudio() {
  if (!initialized && audio) {
    audio.play();
    audio.pause();
    audio.currentTime = 0;

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
