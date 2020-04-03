import { Howl, Howler } from 'howler';

let sound;

function initSound() {
  sound = new Howl({
    src: ['bing.webm', 'bing.mp3']
  });
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (sound) {
      Howler.unload();
      sound = null;
    }

    initSound();
  }
});

initSound();

export function play() {
  if (!sound) {
    initSound();
  }

  if (sound.playing()) {
    sound.stop();
  }

  sound.play();
}
