export const makeQueryString = (queries) =>
  Object.entries(queries)
    .map(([key, value]) => (value ? `${key}=${value}` : ""))
    .filter((queryValue) => Boolean(queryValue))
    .join("&");

//* ex) http://BASE_URL/14-6/endpoint -> /endpoint로 변환
export const removeBaseUrl = (url) => {
  if (!url) return false;
  const haveBaseUrl = typeof url === "string" && url.includes("http");
  return haveBaseUrl && url.slice(url.indexOf("14-6") + 4);
};
