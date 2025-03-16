import { fetcher } from "./instance";

// fetcher가 정상적으로 작동하는지 체크하기 위한 임시 API 요청 로직입니다.
export const getPlaceholderTodosById = async (id = 1) => {
  const result = await fetcher.get(`/todos/${id}`);
  return result;
};
