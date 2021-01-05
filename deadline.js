function getTimeLeft(deadline) {
  if (deadline === "") {
    return null;
  }
  const time = calculateTimeLeft(deadline);
  if (!time) {
    return null;
  }
  const timeLeft =
    String(time.days) +
    " days " +
    String(time.hours) +
    "h " +
    String(time.minutes) +
    "min";
  return timeLeft;
}

function calculateTimeLeft(deadline) {
  const date = new Date(deadline);
  const currentDate = new Date();
  const timeInMin = (date.getTime() - currentDate.getTime()) / 1000 / 60;
  if (timeInMin < 0) {
    return null;
  }
  const days = Math.floor(timeInMin / 60 / 24);
  const hours = Math.floor(timeInMin / 60 - days * 24);
  const minutes = Math.floor(timeInMin - days * 60 * 24 - hours * 60);

  return { days, hours, minutes };
}
