/**
 * @param {second} time
 * @returns mm:ss
 */

export function formSecondToMS(time) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);

  return `${String(minute).padStart(2, "0")}:${String(second).padStart(
    2,
    "0"
  )}`;
}
