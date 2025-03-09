//* =====================================
//* Discord 서비스 모듈
//* =====================================

/**
 * Discord 메시지 전송 서비스 클래스
 */
class DiscordService {
  /**
   * 생성자
   * @param {Object} config - 서비스 설정
   * @param {number} [config.timeout=10000] - 요청 타임아웃 (기본값 10초)
   * @param {Function} [config.logger=console] - 로깅 객체 (기본값 console)
   * @param {string} [config.headerText='🍀 리뷰가 필요한 PR 목록 🍀'] - 메시지 헤더 텍스트
   */
  constructor(config = {}) {
    this.timeout = config.timeout || 10000;
    this.logger = config.logger || console;
    this.headerText = config.headerText || "🍀 리뷰가 필요한 PR 목록 🍀";
  }

  /**
   * Discord 웹훅 URL 유효성 검사
   * @param {string} webhookUrl - 검사할 웹훅 URL
   * @throws {Error} 웹훅 URL이 없는 경우 에러 발생
   */
  validateWebhookUrl(webhookUrl) {
    if (!webhookUrl) {
      this.logger.error("Discord 웹훅 URL이 제공되지 않았습니다.");
      throw new Error("Discord 웹훅 URL이 필요합니다.");
    }
  }

  /**
   * 메시지 페이로드 생성
   * @param {Array} messages - 전송할 메시지 배열
   * @returns {Object} Discord API 요청 페이로드
   */
  createMessagePayload(messages) {
    return {
      content: `${this.headerText}\n\n${messages.join("\n\n")}`,
      allowed_mentions: {
        parse: ["users"], // 멘션 가능한 사용자만 허용
      },
    };
  }

  /**
   * 요청 옵션 생성
   * @param {Object} payload - 메시지 페이로드
   * @returns {Object} Fetch API 요청 옵션
   */
  createFetchOptions(payload) {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      timeout: this.timeout,
    };
  }

  /**
   * 응답 처리
   * @param {Response} response - Fetch API 응답
   * @throws {Error} 요청 실패 시 에러 발생
   */
  async handleResponse(response) {
    if (response.ok) {
      this.logger.log(
        `Discord 메시지 전송 성공! 상태 코드: ${response.status}`,
      );
      return;
    }

    // 실패 시 상세 로깅
    const responseText = await response.text();
    this.logger.error(
      `Discord 메시지 전송 실패. 상태 코드: ${response.status}`,
    );
    this.logger.error("응답 내용:", responseText);
    throw new Error(`Discord 메시지 전송 실패: ${response.status}`);
  }

  /**
   * Discord로 메시지 전송
   * @param {string} webhookUrl - Discord 웹훅 URL
   * @param {Array} messages - 전송할 메시지 배열
   * @returns {Promise<void>}
   */
  async sendMessage(webhookUrl, messages) {
    // 웹훅 URL 검증
    this.validateWebhookUrl(webhookUrl);

    // 로깅
    this.logger.log(`Discord에 ${messages.length}개의 PR 정보 전송 중...`);

    try {
      // 페이로드 및 요청 옵션 생성
      const payload = this.createMessagePayload(messages);
      const fetchOptions = this.createFetchOptions(payload);

      // 메시지 전송
      const response = await fetch(webhookUrl, fetchOptions);

      // 응답 처리
      await this.handleResponse(response);
    } catch (error) {
      this.logger.error("Discord 메시지 전송 중 오류 발생:", error.message);
      throw error;
    }
  }
}

/**
 * Discord 서비스 인스턴스 생성 및 메시지 전송 함수
 * @param {string} webhookUrl - Discord 웹훅 URL
 * @param {Array} messages - 전송할 메시지 배열
 * @param {Object} [options] - 추가 옵션
 * @returns {Promise<void>}
 */
async function sendDiscordMessage(webhookUrl, messages, options = {}) {
  const discordService = new DiscordService({
    headerText: options.headerText || "🍀 리뷰가 필요한 PR 목록 🍀",
  });
  await discordService.sendMessage(webhookUrl, messages);
}

module.exports = {
  DiscordService,
  sendDiscordMessage,
};
