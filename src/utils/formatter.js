export const makeQueryString = (queries) =>
  Object.entries(queries)
    .map(([key, value]) => (value ? `${key}=${value}` : ""))
    .filter((queryValue) => Boolean(queryValue))
    .join("&");

export const removeBaseUrl = (url) => {
  const haveHttp = typeof url === "string" && !url.includes("http");
  return haveHttp || url?.slice(url.indexOf("14-6") + 4);
};
