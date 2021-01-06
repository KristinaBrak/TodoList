function getDeadline(deadline) {
  if (deadline === "") {
    return null;
  }
  const time = calculateDeadline(deadline);
  if (!time) {
    return `Missed deadline ${getMissedDeadline(deadline)}`;
  }
  const timeLeft = `${time.days} days ${time.hours}h ${time.minutes}min`;
  return timeLeft;
}

function calculateDeadline(deadline) {
  const date = new Date(deadline);
  const currentDate = new Date();
  const timeInMin = (date.getTime() - currentDate.getTime()) / 1000 / 60;
  if (timeInMin < 0) {
    return null;
  }
  const days = Math.floor(timeInMin / 60 / 24);
  const hours = Math.floor(timeInMin / 60 - days * 24);
  const minutes = Math.ceil(timeInMin - days * 60 * 24 - hours * 60);

  return { days, hours, minutes };
}

function getMissedDeadline(deadline) {
  const date = new Date(deadline);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}
