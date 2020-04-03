export const formatFileSize = function(byte) {
  const standard = 1024;
  let unit = 0;
  while (byte >= standard || -byte >= standard) {
    byte /= standard;
    unit++;
  }
  return (unit ? byte.toFixed(1) + ' ' : byte) + ' KMGTPEZY'[unit] + 'B';
};

const addZero = function(date) {
  const format = '0' + date;
  return format.slice(-2);
};

export const formatDate = function (mtime) {
  return `${mtime.getFullYear()}/${addZero(mtime.getMonth() + 1)}/${addZero(
    mtime.getDate(),
  )} ${addZero(mtime.getHours())}:${addZero(mtime.getMinutes())}:${addZero(
    mtime.getSeconds(),
  )}`;
};

export const formatTime = function(millisec) {
  const milliseconds = millisec.toFixed(0);
  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 0.94) {
    return milliseconds + 'ms';
  } else if (seconds < 60) {
    return seconds + 's';
  } else if (minutes < 60) {
    return minutes + 'm';
  } else if (hours < 24) {
    return hours + 'h';
  } else {
    return days + 'd';
  }
}

export default {
  formatFileSize,
  formatDate,
  addZero,
  formatTime,
};
