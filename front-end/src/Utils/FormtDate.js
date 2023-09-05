export const formatDate = (format) => {
  if (format == null) return "00:00";
  const date = new Date(format);
  var hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes}`;
};

export const getDateAndTimeNow = () => {
  const dataHora = new Date();

  var year = dataHora.getFullYear();
  var month = dataHora.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  var day = dataHora.getDate();
  day = day < 10 ? "0" + day : day;

  var hours = dataHora.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = dataHora.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var seconds = dataHora.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var milliseconds = dataHora.getMilliseconds();
  if (milliseconds.toString().length === 2) {
    milliseconds = milliseconds + "0";
  }

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
