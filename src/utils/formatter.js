/**
 * 주어진 날짜를 "YYYY.MM.DD." 형식의 문자열로 변환합니다.
 * @param {Date|string|number} date - 변환할 날짜 (Date 객체, 타임스탬프 또는 날짜 문자열)
 * @returns {string} "YYYY.MM.DD." 형식의 날짜 문자열
 */
export const formatDateWithDots = (date) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    throw new Error("유효하지 않은 날짜입니다.");
  }

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedDate = formatter.format(dateObj);

  return formattedDate
    .replace(/\s+/g, "")
    .replace(/(\d{4})\.(\d)\./, "$1.0$2.")
    .replace(/\.(\d)\./, ".$1.0");
};

export const makeQueryString = (queries) => {
  const searchParams = new URLSearchParams();

  Object.entries(queries).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};

//* ex) http://BASE_URL/14-6/endpoint -> /endpoint로 변환
export const removeBaseUrl = (url) => {
  if (!url) return false;
  const haveBaseUrl = typeof url === "string" && url.includes("http");
  return haveBaseUrl && url.slice(url.indexOf("14-6") + 4);
};
