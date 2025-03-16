// useKakaoShare.js
import { useEffect } from "react";

const KAKAO_JAVASCRIPT_SDK_URL = "https://developers.kakao.com/sdk/js/kakao.js";
const DEFAULT_MAIN_IMAGE_URL =
  "https://img.pikbest.com/png-images/qianku/purple-paper-airplane_2388425.png!sw800";

export const useKakaoShare = () => {
  useEffect(() => {
    // 카카오 SDK 스크립트가 이미 로드되어 있는지 확인
    const kakaoScript = document.querySelector(
      `script[src="${KAKAO_JAVASCRIPT_SDK_URL}"]`,
    );

    if (!kakaoScript) {
      // SDK 스크립트 로드
      const script = document.createElement("script");
      script.src = KAKAO_JAVASCRIPT_SDK_URL;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          // SDK 초기화 (본인의 JavaScript 키로 변경)
          window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
        }
      };
    } else if (window.Kakao && !window.Kakao.isInitialized()) {
      // 스크립트는 있지만 초기화가 안된 경우
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  const shareKakao = ({ title, description, imageUrl, webUrl }) => {
    if (window.Kakao) {
      if (window.Kakao.Link) {
        window.Kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: title || "공유 제목",
            description: description || "공유 설명",
            imageUrl: imageUrl || DEFAULT_MAIN_IMAGE_URL,
            link: {
              mobileWebUrl: webUrl,
              webUrl: webUrl,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: webUrl,
                webUrl: webUrl,
              },
            },
          ],
        });
      } else {
        console.error("Kakao.Link is not loaded");
      }
    } else {
      console.error("Kakao SDK is not loaded");
    }
  };

  return shareKakao;
};

export default useKakaoShare;
