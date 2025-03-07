const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Git 설정 파일 위치
const gitConfigPath = path.join(__dirname, "..", ".git", "config");

// 커밋 템플릿 파일 경로
const commitTemplatePath = path.join(__dirname, "..", ".github", ".gitmessage");

try {
  // Git이 초기화되지 않았다면 설정하지 않음
  if (!fs.existsSync(gitConfigPath)) {
    console.log(
      "Git repository not initialized. Skipping commit template setup.",
    );
    process.exit(0);
  }

  // 현재 커밋 템플릿 설정 확인
  const currentTemplate = execSync(
    "git config --local commit.template || echo ''",
    { encoding: "utf-8" },
  ).trim();

  // 이미 설정된 경우 스크립트 종료
  if (currentTemplate === commitTemplatePath) {
    console.log("Commit template already set. Skipping setup.");
    process.exit(0);
  }

  // 커밋 메시지 템플릿 설정
  execSync(`git config --local commit.template ${commitTemplatePath}`);
  console.log("✅ Commit message template has been set!");
} catch (error) {
  console.error("⚠️ Error setting up commit template:", error);
  process.exit(1);
}
