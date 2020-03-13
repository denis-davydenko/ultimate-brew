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
      update(elapsed / 1000);
      frame = requestAnimationFrame(step);
    } else {
      init(duration);
      finish();
    }
  };

  init(seconds * 1000);

  return {
    reset: seconds => init(seconds ? seconds * 1000 : duration),
    elapsed: () =>
      Math.min(
        duration / 1000,
        startTime === null
          ? duration / 1000
          : (performance.now() - startTime) / 1000
      ),
    start: () => {
      startTime = performance.now();
      step(startTime);
    }
  };
};
