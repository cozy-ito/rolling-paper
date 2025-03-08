module.exports = async ({ github, context, core }) => {
  const creator = context.payload.pull_request.user.login;

  // 환경 변수에서 사용자명 읽기
  const { joJHUser, jiJHUser, jinSJUser, choiKJUser } = JSON.parse(
    process.env.COLLABORATORS,
  );

  // 모든 사용자명이 제대로 설정되었는지 확인
  if (!joJHUser || !jiJHUser || !jinSJUser || !choiKJUser) {
    core.setFailed("필요한 환경 변수가 설정되지 않았습니다.");
    return;
  }

  console.log(`PR 생성자: ${creator}`);

  // 리뷰어 매핑 정의
  const reviewerMap = {
    [joJHUser]: [jiJHUser, jinSJUser],
    [jiJHUser]: [jinSJUser, choiKJUser],
    [jinSJUser]: [choiKJUser, joJHUser],
    [choiKJUser]: [joJHUser, jiJHUser],
  };

  // 해당 사용자의 리뷰어 배열 가져오기
  const reviewers = reviewerMap[creator];

  // 매핑된 리뷰어가 있으면 리뷰어 요청 및 담당자 지정
  if (reviewers) {
    try {
      // 리뷰어 요청
      await github.rest.pulls.requestReviewers({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.payload.pull_request.number,
        reviewers: reviewers,
      });

      // 본인을 담당자로 지정
      await github.rest.issues.addAssignees({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.payload.pull_request.number,
        assignees: [creator],
      });

      console.log(
        `리뷰어 ${reviewers.join(", ")}와(과) 담당자 ${creator}가 성공적으로 할당되었습니다.`,
      );
    } catch (error) {
      core.setFailed(`리뷰어 할당 중 오류가 발생했습니다: ${error.message}`);
    }
  } else {
    console.log(`${creator}에 대한 리뷰어 매핑을 찾을 수 없습니다.`);
  }
};
