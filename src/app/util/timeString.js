module.exports = function timeString(seconds, forceHours = false, ms = true) {
  // eslint-disable-next-line no-param-reassign
  if (ms) seconds /= 1000;
  const hours = Math.floor(seconds / 3600);
  // eslint-disable-next-line no-mixed-operators
  const minutes = Math.floor(seconds % 3600 / 60);

  return `${forceHours || hours >= 1 ? `${hours}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : minutes}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
};
