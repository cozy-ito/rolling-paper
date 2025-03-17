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
