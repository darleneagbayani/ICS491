// compare two Date objects.
export function compareDate(date1, date2) {
  const formattedDate1 = [date1.getFullYear(), date1.getMonth(), date1.getDate()].join('-');
  const formattedDate2 = [date2.getFullYear(), date2.getMonth(), date2.getDate()].join('-');

  return formattedDate1 === formattedDate2;
}
