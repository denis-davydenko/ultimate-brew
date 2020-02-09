const padWithZeroes = (number, count = 2) =>
  number.toString().padStart(count, '0');

const millisecondsToSeconds = milliseconds => Math.floor(milliseconds / 1000);
const secondsToMinutes = seconds => Math.floor(seconds / 60);

export function formatTime(time) {
  const timeInSeconds = millisecondsToSeconds(time);
  const remainingMilliseconds = Math.floor(time % 1000);
  const minutes = secondsToMinutes(timeInSeconds);
  const remainingSeconds = timeInSeconds % 60;

  return `${padWithZeroes(minutes)}:${padWithZeroes(
    remainingSeconds
  )}.${padWithZeroes(remainingMilliseconds, 3)}`;
}
