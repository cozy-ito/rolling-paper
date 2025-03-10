//* =====================================
//* 리뷰 리마인더 모듈
//* =====================================
const { sendDiscordMessage } = require("./discord-service.cjs");
const { getReviews } = require("./github-service.cjs");

/**
 * 리뷰 상태를 매핑하는 함수
 * @param {string} state - GitHub 리뷰 상태
 * @returns {string} 이모지와 함께하는 상태 메시지
 */
function mapReviewState(state) {
  const upperCaseState = state.toUpperCase();
  const stateMap = {
    APPROVED: "승인 ✅",
    CHANGES_REQUESTED: "변경 요청 ⚠️",
    COMMENTED: "코멘트 💬",
  };
  return stateMap[upperCaseState] || "리뷰 상태 알 수 없음 ❓";
}

/**
 * 리뷰어 정보를 가져오는 클래스
 */
class ReviewerInfoManager {
  /**
   * 생성자
   * @param {Object} discordMentions - 디스코드 멘션 매핑 객체
   */
  constructor(discordMentions) {
    this.discordMentions = discordMentions;
  }

  /**
   * 리뷰어의 디스코드 정보 가져오기
   * @param {string} reviewerLogin - 리뷰어 깃허브 로그인 이름
   * @returns {Object} 디스코드 정보
   */
  getDiscordInfo(reviewerLogin) {
    return (
      this.discordMentions[reviewerLogin] || {
        id: reviewerLogin,
        displayName: reviewerLogin,
      }
    );
  }
}

/**
 * PR 리뷰 상태 분석 클래스
 */
class PRReviewAnalyzer {
  /**
   * 생성자
   * @param {Object} github - GitHub API 클라이언트
   * @param {string} owner - 레포지토리 소유자
   * @param {string} repo - 레포지토리 이름
   */
  constructor(github, owner, repo) {
    this.github = github;
    this.owner = owner;
    this.repo = repo;
  }

  /**
   * PR의 리뷰 상태 분석
   * @param {Object} pullRequest - PR 정보
   * @returns {Promise<Object>} 리뷰 상태 분석 결과
   */
  async analyzeReviewStatus(pullRequest) {
    // PR의 모든 리뷰 가져오기
    const reviews = await getReviews(
      this.github,
      this.owner,
      this.repo,
      pullRequest.number,
    );

    // 리뷰 상태 확인
    const reviewStates = new Map();
    reviews.forEach((rev) => {
      const {
        user: { login },
        state,
      } = rev;
      if (login !== pullRequest.user.login) {
        reviewStates.set(login, state);
      }
    });

    // 요청된 리뷰어 찾기
    const requestedReviewers =
      pullRequest.requested_reviewers?.map((r) => r.login) || [];

    // 아직 리뷰하지 않은 리뷰어 찾기
    const pendingReviewers = requestedReviewers.filter(
      (reviewer) =>
        !reviewStates.has(reviewer) ||
        ["COMMENTED", "DISMISSED"].includes(reviewStates.get(reviewer)),
    );

    return {
      reviewStates,
      requestedReviewers,
      pendingReviewers,
    };
  }
}

/**
 * 디스코드 메시지 생성 클래스
 */
class DiscordMessageBuilder {
  /**
   * 생성자
   * @param {ReviewerInfoManager} reviewerInfoManager - 리뷰어 정보 관리자
   */
  constructor(reviewerInfoManager) {
    this.reviewerInfoManager = reviewerInfoManager;
  }

  /**
   * 디스코드 메시지 생성
   * @param {Object} pullRequest - PR 정보
   * @param {Object} review - 리뷰 정보
   * @param {Object} reviewAnalysis - 리뷰 분석 결과
   * @returns {string} 디스코드 메시지
   */
  buildMessage(pullRequest, review, reviewAnalysis) {
    const reviewerLogin = review.user.login;
    const reviewerDiscord =
      this.reviewerInfoManager.getDiscordInfo(reviewerLogin);

    // PR 작성자의 디스코드 정보 가져오기 (추가된 부분)
    const authorLogin = pullRequest.user.login;
    const authorDiscord = this.reviewerInfoManager.getDiscordInfo(authorLogin);

    // 리뷰 상태 메시지
    const reviewMessage = mapReviewState(review.state);

    // 디스코드 메시지 포맷팅
    let message = `[[PR] ${pullRequest.title}](<${pullRequest.html_url}>)
PR 작성자: <@${authorDiscord.id}>
리뷰어: ${reviewerDiscord.displayName}
리뷰 상태: ${reviewMessage}

리뷰 내용:
\`\`\`
${review.body || "상세 리뷰 내용 없음"}
\`\`\``;

    // 보류 중인 리뷰어 멘션 생성
    const pendingReviewerMentions = reviewAnalysis.pendingReviewers
      .map((reviewer) => {
        const discordInfo = this.reviewerInfoManager.getDiscordInfo(reviewer);
        return `<@${discordInfo.id}>`;
      })
      .join(" ");

    // 보류 중인 리뷰어가 있다면 멘션 추가
    if (pendingReviewerMentions) {
      message += `\n⏳ 아직 리뷰하지 않은 리뷰어들: ${pendingReviewerMentions}\n리뷰를 완료해 주세요! 🔍`;
    }

    return message;
  }
}

/**
 * 리뷰 알림 서비스
 */
class ReviewAlarmService {
  /**
   * 생성자
   * @param {Object} config - 서비스 설정
   * @param {string} config.discordWebhook - 디스코드 웹훅 URL
   * @param {Object} config.discordMentions - 디스코드 멘션 매핑
   */
  constructor(config) {
    this.discordWebhook = config.discordWebhook;
    this.reviewerInfoManager = new ReviewerInfoManager(config.discordMentions);
  }

  /**
   * 리뷰 알림 처리
   * @param {Object} github - GitHub API 클라이언트
   * @param {Object} context - GitHub 액션 컨텍스트
   * @param {Object} core - GitHub 액션 코어
   */
  async sendReviewAlarm(github, context, core) {
    try {
      const owner = context.repo.owner;
      const repo = context.repo.repo;

      // 현재 리뷰 이벤트 정보 추출
      const { pull_request, review } = context.payload;

      if (!pull_request || !review) {
        console.log("풀 리퀘스트 또는 리뷰 정보 없음");
        return;
      }

      // PR 리뷰 분석
      const reviewAnalyzer = new PRReviewAnalyzer(github, owner, repo);
      const reviewAnalysis =
        await reviewAnalyzer.analyzeReviewStatus(pull_request);

      // 메시지 생성
      const messageBuilder = new DiscordMessageBuilder(
        this.reviewerInfoManager,
      );
      const message = messageBuilder.buildMessage(
        pull_request,
        review,
        reviewAnalysis,
      );

      // Discord로 메시지 전송
      await sendDiscordMessage(this.discordWebhook, [message], {
        headerText: "⭐️ 리뷰 알림 ⭐️",
      });
    } catch (error) {
      console.error("리뷰 알림 처리 중 오류 발생:", error.message);
      core.setFailed(`리뷰 알림 처리 실패: ${error.message}`);
    }
  }
}

module.exports = {
  ReviewAlarmService,
};
