const padWithZeroes = (number, count = 2) =>
  number.toString().padStart(count, '0');

const secondsToMinutes = seconds => Math.floor(seconds / 60);

export function formatTime(time) {
  const minutes = secondsToMinutes(time);
  const remainingSeconds = (time % 60).toFixed(2);

  return `${padWithZeroes(minutes)}:${padWithZeroes(remainingSeconds, 6)}`;
}
