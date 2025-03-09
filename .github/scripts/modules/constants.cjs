//* =====================================
//* 상수 정의 모듈
//* =====================================

// GitHub에서 반환하는 리뷰 상태 값
const GITHUB_REVIEW_STATES = {
  APPROVED: "APPROVED",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
  COMMENTED: "COMMENTED",
};

// 리뷰 상태 표시용 약어
const STATE_ABBREVIATIONS = {
  [GITHUB_REVIEW_STATES.APPROVED]: "Approved",
  [GITHUB_REVIEW_STATES.CHANGES_REQUESTED]: "Changes Requested",
  [GITHUB_REVIEW_STATES.COMMENTED]: "Commented",
};

module.exports = {
  GITHUB_REVIEW_STATES,
  STATE_ABBREVIATIONS,
};
