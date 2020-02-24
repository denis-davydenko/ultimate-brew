import { Howl } from 'howler';

const sound = new Howl({ src: ['bing.mp3'] });
export function play() {
  sound.stop();
  sound.play();
}
