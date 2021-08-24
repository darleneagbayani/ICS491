export function compareDates(date1, date2) {
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  const date1Join = [year1, month1, day1].join('-');
  const date2Join = [year2, month2, day2].join('-');

  return date1Join === date2Join;
}
