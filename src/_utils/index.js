export function convertTo24Hour(time) {
  if (!time) return;
  var hours = parseInt(time.substr(0, 2));
  if (time.indexOf("AM") !== -1 && hours === 12) {
    time = time.replace("12", "0");
  }
  if (time.indexOf("PM") !== -1 && hours < 12) {
    time = time.replace(hours, hours + 12);
  }
  return time.replace(/(AM|PM)/, "");
}

export function convertTo12Hour(date) {
  var hours = date.hours();
  var minutes = date.minutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function getDateFormattedArr(dateStr) {
  if (!dateStr) return;
  return dateStr
    .split(" ")
    .map((i) => i.trim())
    .filter((i) => i !== "");
}
