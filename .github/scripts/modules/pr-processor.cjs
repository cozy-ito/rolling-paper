//* =====================================
//* PR 처리 모듈
//* =====================================

const { getReviews } = require("./github-service.cjs");
const {
  GITHUB_REVIEW_STATES,
  STATE_ABBREVIATIONS,
} = require("./constants.cjs");

/**
 * PR 정보를 처리하여 메시지 배열을 생성합니다.
 */
async function generatePRMessages(
  github,
  owner,
  repo,
  pullRequests,
  discordMentions,
) {
  // 레포지토리 협력자 여부 확인
  let hasCollaborators = false;
  try {
    const { data } = await github.rest.repos.listCollaborators({
      owner,
      repo,
      per_page: 1,
    });
    hasCollaborators = data.length > 0;
    console.log(`${owner}/${repo} 레포지토리 협력자 여부:`, hasCollaborators);
  } catch (error) {
    console.warn(`협력자 정보 가져오기 실패:`, error.message);
    hasCollaborators = true; // 오류 시 안전하게 협력자가 있다고 가정
  }

  // 각 PR에 대해 메시지 생성
  return Promise.all(
    pullRequests.map(async (pr) => {
      console.log(`PR #${pr.number} "${pr.title}" 처리 중`);
      const reviews = await getReviews(github, owner, repo, pr.number);
      const requestedReviewers =
        pr.requested_reviewers?.map(({ login }) => login) || [];

      const reviewInfo = analyzeReviewStatuses(
        pr,
        reviews,
        requestedReviewers,
        discordMentions,
        hasCollaborators,
      );

      return generatePRMessage(
        pr,
        reviewInfo,
        discordMentions,
        hasCollaborators,
      );
    }),
  );
}

/**
 * PR의 리뷰 상태를 분석합니다.
 */
function analyzeReviewStatuses(
  pr,
  reviews,
  requestedReviewers,
  discordMentions,
  hasCollaborators,
) {
  // 리뷰어별 최신 상태 추출
  const reviewStates = new Map();
  reviews.forEach((review) => {
    const {
      user: { login },
      state,
    } = review;
    if (login !== pr.user.login) reviewStates.set(login, state);
  });

  // 승인 및 부정적 리뷰 수 계산
  const approvedReviewCount = [...reviewStates.values()].filter(
    (state) => state === GITHUB_REVIEW_STATES.APPROVED,
  ).length;

  const hasNegativeReviews = [...reviewStates.values()].some((state) =>
    ["CHANGES_REQUESTED", "DISMISSED"].includes(state),
  );

  // 리뷰어 상태 메시지 생성
  const reviewStatuses = [...reviewStates].map(([reviewer, state]) => {
    const discordInfo = discordMentions[reviewer] || {
      id: reviewer,
      displayName: reviewer,
    };
    const reviewState = STATE_ABBREVIATIONS[state] || state.toLowerCase();

    return state === GITHUB_REVIEW_STATES.APPROVED
      ? `${discordInfo.displayName}(${reviewState})`
      : `<@${discordInfo.id}>(${reviewState})`;
  });

  // 리뷰 미시작 리뷰어 처리
  const notStartedReviewers = requestedReviewers.filter(
    (reviewer) => !reviewStates.has(reviewer) && reviewer !== pr.user.login,
  );

  const notStartedMentions = notStartedReviewers.map((reviewer) => {
    const discordInfo = discordMentions[reviewer] || { id: reviewer };
    return `<@${discordInfo.id}>(X)`;
  });

  // 모든 리뷰 상태 메시지 통합
  const reviewStatusMessage = [...reviewStatuses, ...notStartedMentions];

  // 승인 완료 상태 결정
  const hasNoRequestedReviewers = requestedReviewers.length === 0;
  const isNotHasPendingReviews = notStartedReviewers.length === 0;
  const isAllReviewersApproved =
    hasNoRequestedReviewers ||
    requestedReviewers.every(
      (reviewer) =>
        reviewStates.get(reviewer) === GITHUB_REVIEW_STATES.APPROVED,
    );
  const isApprovalComplete = !hasCollaborators || approvedReviewCount > 0;

  // 디버깅 로그
  console.log(`PR #${pr.number} 승인 상태:`, {
    approvedCount: approvedReviewCount,
    isAllApproved: isAllReviewersApproved,
    noPending: isNotHasPendingReviews,
    hasNegative: hasNegativeReviews,
  });

  return {
    reviewStatusMessage,
    isAllReviewersApproved,
    isNotHasPendingReviews,
    hasNoRequestedReviewers,
    approvedReviewCount,
    isApprovalComplete,
    hasNegativeReviews,
  };
}

/**
 * PR 정보와 리뷰 상태를 기반으로 메시지를 생성합니다.
 */
function generatePRMessage(pr, reviewInfo, discordMentions, hasCollaborators) {
  const {
    reviewStatusMessage,
    isAllReviewersApproved,
    isNotHasPendingReviews,
    hasNoRequestedReviewers,
    approvedReviewCount,
    isApprovalComplete,
    hasNegativeReviews,
  } = reviewInfo;

  // PR 작성자 멘션
  const authorMention = discordMentions[pr.user.login]?.id || pr.user.login;

  // 머지 가능 여부 (승인 완료 + 보류 없음 + 부정적 리뷰 없음)
  const canMerge =
    isApprovalComplete && isNotHasPendingReviews && !hasNegativeReviews;

  // 머지 가능한 경우
  if (canMerge) {
    let approvalMessage;

    if (!hasCollaborators) {
      approvalMessage =
        "모든 리뷰어의 승인 완료! 코멘트를 확인 후 머지해 주세요 🚀";
    } else if (approvedReviewCount > 0) {
      approvalMessage = isAllReviewersApproved
        ? "모든 리뷰어의 승인 완료! 코멘트를 확인 후 머지해 주세요 🚀"
        : "필요한 승인 수를 만족했습니다! 코멘트를 확인 후 머지해 주세요 🚀";
    } else if (hasNoRequestedReviewers) {
      approvalMessage =
        "할당된 리뷰어가 없지만, 적어도 하나의 승인이 필요합니다.";
    } else {
      approvalMessage = "머지 준비가 완료되었습니다.";
    }

    const showReviewers = hasCollaborators && reviewStatusMessage.length > 0;
    const reviewerList = showReviewers
      ? `리뷰어: ${reviewStatusMessage.join(", ")}\n`
      : "";

    return `[[PR] ${pr.title}](<${pr.html_url}>)\n${reviewerList}<@${authorMention}>, ${approvalMessage}`;
  }
  // 부정적 리뷰가 있는 경우
  else if (hasNegativeReviews) {
    const showReviewers = reviewStatusMessage.length > 0;
    const reviewerList = showReviewers
      ? `리뷰어: ${reviewStatusMessage.join(", ")}\n`
      : "";

    return `[[PR] ${pr.title}](<${pr.html_url}>)\n${reviewerList}<@${authorMention}>, 머지 준비가 완료되지 않았습니다. PR을 확인해 주세요.`;
  }

  // 일반 메시지
  const showReviewers = reviewStatusMessage.length > 0;
  const reviewerMsg = showReviewers
    ? `리뷰어: ${reviewStatusMessage.join(", ")}`
    : "리뷰어가 없습니다.";

  return `[[PR] ${pr.title}](<${pr.html_url}>)\n${reviewerMsg}`;
}

module.exports = {
  generatePRMessages,
  analyzeReviewStatuses,
  generatePRMessage,
};
