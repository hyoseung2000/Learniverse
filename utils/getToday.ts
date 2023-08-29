// 유틸성 함수들 (예시)
const getToday = () => {
  const date = new Date();

  const year = date.getFullYear().toString();
  /* const slicedYear = date.getFullYear().toString().slice(-2); */
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}.${month}.${day}`;

  return {
    today,
  };
};

export default getToday;
