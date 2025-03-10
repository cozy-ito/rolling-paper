//* =====================================
//* GitHub API 서비스 모듈
//* =====================================

/**
 * 열린 PR 목록을 가져옵니다.
 * @param {Object} github - GitHub API 클라이언트
 * @param {string} owner - 저장소 소유자
 * @param {string} repo - 저장소 이름
 * @returns {Array} Draft가 아닌 열린 PR 목록
 */
async function fetchOpenPullRequests(github, owner, repo) {
  console.log(`${owner}/${repo} 저장소의 PR 정보를 가져오는 중...`);
  const pullRequests = await github.rest.pulls.list({
    owner,
    repo,
    state: "open",
  });

  console.log(`총 ${pullRequests.data.length}개의 열린 PR 발견`);

  //* Draft 상태가 아니면서, 생성한 지 오래된 순으로 정렬
  const targetPRs = pullRequests.data
    .filter((pr) => !pr.draft)
    .sort(
      (a, b) =>
        new Date(a.created_at ?? a.updated_at) -
        new Date(b.created_at ?? b.updated_at),
    );

  // Draft가 아닌 PR이 없는 경우에 실행 중지
  if (targetPRs.length === 0) {
    console.log("Draft가 아닌 열린 PR이 없습니다. 작업을 수행하지 않습니다.");
    return [];
  }

  console.log(`Draft가 아닌 PR ${targetPRs.length}개 처리 중...`);
  return targetPRs;
}

/**
 * 특정 PR의 리뷰 상태를 가져옵니다.
 * @param {Object} github - GitHub API 클라이언트
 * @param {string} owner - 저장소 소유자
 * @param {string} repo - 저장소 이름
 * @param {number} prNumber - PR 번호
 * @returns {Array} 리뷰 목록
 */
async function getReviews(github, owner, repo, prNumber) {
  const reviews = await github.rest.pulls.listReviews({
    owner,
    repo,
    pull_number: prNumber,
  });
  return reviews.data;
}

module.exports = {
  fetchOpenPullRequests,
  getReviews,
};
