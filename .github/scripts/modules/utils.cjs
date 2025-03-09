//* =====================================
//* 유틸리티 함수 모듈
//* =====================================

/**
 * 날짜가 지정된 종료일 이후인지 확인합니다.
 * @param {Date} currentDate - 현재 날짜
 * @param {Date} endDate - 종료 날짜
 * @returns {boolean} 현재 날짜가 종료 날짜 이후인지 여부
 */
function isAfterEndDate(currentDate, endDate) {
  return currentDate > endDate;
}

/**
 * 안전하게 JSON 문자열을 파싱합니다.
 * @param {string} jsonString - JSON 문자열
 * @param {Object} defaultValue - 파싱 실패 시 반환할 기본값
 * @returns {Object} 파싱된 객체 또는 기본값
 */
function safeJsonParse(jsonString, defaultValue = {}) {
  if (!jsonString) return defaultValue;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("JSON 파싱 실패:", error.message);
    return defaultValue;
  }
}

module.exports = {
  isAfterEndDate,
  safeJsonParse,
};
