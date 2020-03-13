import { Howl } from 'howler';

const sound = new Howl({
  src: ['bing.webm', 'bing.mp3'],
  onplayerror: () => {
    sound.once('unlock', () => {
      sound.play();
    });
  }
});

export function play() {
  sound.stop();
  sound.play();
}
