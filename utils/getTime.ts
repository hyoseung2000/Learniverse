export const getTime = (date: Date) => {
  const formattedTime = `${String(date.getUTCHours()).padStart(
    2,
    '0',
  )}:${String(date.getUTCMinutes()).padStart(2, '0')}`;

  return formattedTime;
};

export const getKSTTime = (date: Date) => {
  const formattedKSTTime = `${String(date.getUTCHours() + 9).padStart(
    2,
    '0',
  )}:${String(date.getUTCMinutes()).padStart(2, '0')}`;

  console.log(date, formattedKSTTime);
  return formattedKSTTime;
};
