const BASE_URL = import.meta.env.VITE_BASE_URL;

class Fetcher {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        }),
      );
    }

    return response.status !== 204 ? await response.json() : null;
  }

  /**
   * GET 요청을 수행합니다
   * @async
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestInit?} [options={}] - fetch API 옵션
   * @returns {Promise<Object|null>} 응답 데이터
   * @throws {Error} 네트워크 오류나 API 응답 에러 발생 시
   */
  get(endpoint, options = {}) {
    return this.makeRequest(endpoint, { method: "GET", ...options });
  }

  /**
   * POST 요청을 수행합니다
   * @async
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} data - 요청 본문 데이터
   * @param {RequestInit?} [options={}] - fetch API 옵션
   * @returns {Promise<Object|null>} 응답 데이터
   * @throws {Error} 네트워크 오류나 API 응답 에러 발생 시
   */
  post(endpoint, data, options = {}) {
    return this.makeRequest(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * DELETE 요청을 수행합니다
   * @async
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestInit?} [options={}] - fetch API 옵션
   * @returns {Promise<Object|null>} 응답 데이터
   * @throws {Error} 네트워크 오류나 API 응답 에러 발생 시
   */
  delete(endpoint, options = {}) {
    return this.makeRequest(endpoint, { method: "DELETE", ...options });
  }

  /**
   * PATCH 요청을 수행합니다
   * @async
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} data - 요청 본문 데이터
   * @param {RequestInit?} [options={}] - fetch API 옵션
   * @returns {Promise<Object|null>} 응답 데이터
   * @throws {Error} 네트워크 오류나 API 응답 에러 발생 시
   */
  patch(endpoint, data, options = {}) {
    return this.makeRequest(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options.headers },
      body: JSON.stringify(data),
      ...options,
    });
  }
}

export const fetcher = new Fetcher(BASE_URL);
