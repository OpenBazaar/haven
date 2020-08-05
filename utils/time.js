export const formatSeconds = (seconds, suppressJustNow = false, isShort = true) => {
  let interval = Math.floor(seconds / 31536000);

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return isShort ? `${interval}d` : `${interval} day${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return isShort ? `${interval}h` : `${interval} hour${interval > 1 ? 's' : ''}`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return isShort ? `${interval}m` : `${interval} minute${interval > 1 ? 's' : ''}`;
  }

  if (seconds <= -60) {
    return 'Timeout reached';
  } else if (seconds <= 0) {
    return suppressJustNow ? '0s' : 'Just now';
  } else {
    return `${Math.floor(seconds)}s`;
  }
};

export function timeSinceInSeconds(date) {
  return Math.floor((new Date() - date) / 1000);
}

export function timeSince(date, suppressJustNow = false) {
  return formatSeconds(timeSinceInSeconds(date), suppressJustNow);
}

export function timeUntil(disputeStart, timeout, isShort = true) {
  const disputeStartHours = new Date(disputeStart);
  const timeoutHours = disputeStartHours.setHours(disputeStartHours.getHours() + timeout);
  const timeoutDate = new Date(timeoutHours);
  const seconds = Math.floor((timeoutDate - new Date()) / 1000);
  return formatSeconds(seconds, false, isShort);
}

export const timestampComparator = (item1, item2) => {
  const d1 = new Date(item1.timestamp);
  const d2 = new Date(item2.timestamp);

  if (d1 > d2) {
    return -1;
  } else if (d1 < d2) {
    return 1;
  } else {
    return 0;
  }
};
