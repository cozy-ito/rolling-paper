//* =====================================
//* 디스코드 리뷰 리마인더
//* =====================================

const { ReviewAlarmService } = require("./modules/review-processor.cjs");
const { safeJsonParse } = require("./modules/utils.cjs");

module.exports = async ({ github, context, core }) => {
  // 설정 생성
  const config = {
    discordWebhook: process.env.DISCORD_WEBHOOK,
    discordMentions: safeJsonParse(process.env.DISCORD_MENTION, {}),
  };

  // 서비스 인스턴스 생성
  const reviewAlarmService = new ReviewAlarmService(config);

  // 리뷰 알림 전송
  await reviewAlarmService.sendReviewAlarm(github, context, core);
};
