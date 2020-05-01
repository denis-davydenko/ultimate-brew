import { ONE_SEC } from '../consts';

export const createTimer = (seconds, update, finish) => {
  let startTime, duration, frame;

  const init = millis => {
    if (frame) {
      cancelAnimationFrame(frame);
      frame = null;
    }

    startTime = null;
    duration = millis;
  };

  const step = time => {
    if (startTime === null) {
      return;
    }

    let elapsed = time - startTime;

    if (elapsed <= duration) {
      update(elapsed / ONE_SEC);
      frame = requestAnimationFrame(step);
    } else {
      init(duration);
      finish();
    }
  };

  init(seconds * ONE_SEC);

  return {
    reset: seconds => init(seconds ? seconds * ONE_SEC : duration),
    elapsed: () =>
      Math.min(
        duration / ONE_SEC,
        startTime === null
          ? duration / ONE_SEC
          : (performance.now() - startTime) / ONE_SEC
      ),
    start: () => {
      startTime = performance.now();
      step(startTime);
    }
  };
};
