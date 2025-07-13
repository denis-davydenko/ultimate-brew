import { Howl, Howler } from 'howler';

let sound = null;

function initSound() {
  const howl = new Howl({
    src: ['bing.webm', 'bing.mp3'],
    html5: false
  });

  return new Promise((resolve, reject) => {
    howl.once('load', () => {
      resolve(howl);
    });

    howl.once('loaderror', () => {
      reject();
    });
  });
}

function play() {
  if (sound.playing()) {
    sound.stop();
  }

  sound.play();
}

function stop() {
  if (sound) {
    sound.stop();
  }
}

export async function playSound() {
  stop();

  if (!sound) {
    sound = await initSound();
  }

  const isHowlerPaused =
    Howler.ctx &&
    (Howler.ctx.state === 'suspended' || Howler.ctx.state === 'interrupted');

  if (isHowlerPaused) {
    Howler.ctx.resume().then(() => {
      play();
    });
  } else {
    play();
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stop();
  }
});
