import { useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import ArrowButton from "../../components/ArrowButton/ArrowButton";
import CardList from "../../components/CardList/CardList";
import useFetchData from "../../hooks/useFetchData";

import styles from "./ListPage.module.css";

const ListPage = () => {
  const navigate = useNavigate();

  // 데이터, 로딩, 에러 상태
  const {
    isLoading,
    isError,
    error,
    data: recipients,
  } = useFetchData(fetchRecipients);

  // 한 번에 보여줄 카드 개수
  const itemsToShow = 4;

  // 인기 캐러셀 인덱스 상태
  const [popularIndex, setPopularIndex] = useState(0);
  // 최근 캐러셀 인덱스 상태
  const [recentIndex, setRecentIndex] = useState(0);

  // 인기 롤링 페이퍼 (messageCount, reactionCount 내림차순)
  const popularRecipients = useMemo(() => {
    return [...(recipients || [])].sort((a, b) => {
      if (b.messageCount !== a.messageCount) {
        return b.messageCount - a.messageCount; // 1순위: messageCount 내림차순
      }
      return b.reactionCount - a.reactionCount; // 2순위: reactionCount 내림차순
    });
  }, [recipients]);

  // 최근 롤링 페이퍼 (createdAt 내림차순)
  const recentRecipients = useMemo(() => {
    return [...(recipients || [])].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [recipients]);

  // 인기 섹션 좌우 이동 핸들러
  const handlePopularPrev = () => {
    if (popularIndex > 0) {
      setPopularIndex(popularIndex - 1);
    }
  };
  const handlePopularNext = () => {
    if (popularIndex + itemsToShow < popularRecipients.length) {
      setPopularIndex(popularIndex + 1);
    }
  };

  // 최근 섹션 좌우 이동 핸들러
  const handleRecentPrev = () => {
    if (recentIndex > 0) {
      setRecentIndex(recentIndex - 1);
    }
  };
  const handleRecentNext = () => {
    if (recentIndex + itemsToShow < recentRecipients.length) {
      setRecentIndex(recentIndex + 1);
    }
  };

  //로딩 중
  if (isLoading) {
    return (
      <div className={styles.skeleton}>
        {/* 인기 롤링 페이퍼 섹션 */}
        <div className={styles.skeletonContainer}>
          <div className={styles.title}>인기 롤링 페이퍼 🔥</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <div className={styles.spinner} />
              </div>
            ))}
          </div>

          {/* 최근에 만든 롤링 페이퍼 */}
          <div className={styles.title}>최근에 만든 롤링 페이퍼 ⭐️</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <div className={styles.spinner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) return <p>오류 발생: {error?.message || "알 수 없는 오류"}</p>;

  // 카드 너비와 간격 (css와 일치시켜주세요)
  const cardWidth = 275; // px
  const cardGap = 20; // px
  const totalCardWidth = cardWidth + cardGap; // 한 카드당 차지하는 전체 너비

  return (
    <div className={styles.listPageWrapper}>
      {/* 인기 롤링 페이퍼 섹션 */}
      <div className={styles.title}>인기 롤링 페이퍼 🔥</div>
      <div className={styles.carouselContainer}>
        {/* 좌측/우측 버튼 */}
        <div className={styles.arrowLeftButton}>
          {popularIndex === 0 ? null : (
            <ArrowButton direction="left" onClick={handlePopularPrev} />
          )}
        </div>
        <div className={styles.arrowRightButton}>
          {popularIndex + itemsToShow >= popularRecipients.length ? null : (
            <ArrowButton direction="right" onClick={handlePopularNext} />
          )}
        </div>
        {/* 카드 리스트 래퍼 */}
        <div className={styles.cardListWrapper}>
          <div
            className={styles.cardList}
            style={{
              transform: `translateX(-${popularIndex * totalCardWidth}px)`,
            }}
          >
            {popularRecipients.map((recipient) => {
              const hexColor = getHexColor(recipient.backgroundColor);
              // **동적 프로필 이미지**: recentMessages에서 profileImageURL 사용
              const dynamicProfileImages =
                recipient.recentMessages?.map((msg) => (
                  <img
                    key={msg.id}
                    src={msg.profileImageURL}
                    alt={msg.sender}
                  />
                )) || [];
              // topReactions 데이터를 이용해 동적 badges 생성
              const dynamicBadges =
                recipient.topReactions?.map((reaction) => ({
                  id: `badge-${reaction.id}`,
                  text: reaction.emoji,
                  count: reaction.count,
                })) || [];

              return (
                <div className={styles.card} key={recipient.id}>
                  <CardList
                    backgroundColor={hexColor}
                    profileSection={dynamicProfileImages}
                    totalUsers={recipient.messageCount}
                    message={`To. ${recipient.name}`}
                    userMessage={`명이 작성했어요!`}
                    badges={dynamicBadges}
                    onClick={() => navigate(`/post/${recipient.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 최근 롤링 페이퍼 섹션 */}
      <div className={styles.title}>최근에 만든 롤링 페이퍼 ⭐️</div>
      <div className={styles.carouselContainer}>
        <div className={styles.arrowLeftButton}>
          {recentIndex === 0 ? null : (
            <ArrowButton direction="left" onClick={handleRecentPrev} />
          )}
        </div>
        <div className={styles.arrowRightButton}>
          {recentIndex + itemsToShow >= recentRecipients.length ? null : (
            <ArrowButton direction="right" onClick={handleRecentNext} />
          )}
        </div>
        <div className={styles.cardListWrapper}>
          <div
            className={styles.cardList}
            style={{
              transform: `translateX(-${recentIndex * totalCardWidth}px)`,
            }}
          >
            {recentRecipients.map((recipient) => {
              const hexColor = getHexColor(recipient.backgroundColor);
              // 동적 프로필 이미지: profileImageURL 사용
              const dynamicProfileImages =
                recipient.recentMessages?.map((msg) => (
                  <img
                    key={msg.id}
                    src={msg.profileImageURL}
                    alt={msg.sender}
                  />
                )) || [];
              // topReactions 데이터를 이용해 동적 badges 생성
              const dynamicBadges =
                recipient.topReactions?.map((reaction) => ({
                  id: `badge-${reaction.id}`,
                  text: reaction.emoji,
                  count: reaction.count,
                })) || [];

              return (
                <div className={styles.card} key={recipient.id}>
                  <CardList
                    backgroundColor={hexColor}
                    profileSection={dynamicProfileImages}
                    totalUsers={recipient.messageCount}
                    message={`To. ${recipient.name}`}
                    userMessage={`명이 작성했어요!`}
                    badges={dynamicBadges}
                    onClick={() => navigate(`/post/${recipient.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 하단 버튼 (새 롤링 페이퍼 생성) */}
      <div className={styles.button}>
        <button
          className={styles.buttonChild}
          onClick={() => navigate("/post")}
        >
          나도 만들어보기
        </button>
      </div>
    </div>
  );
};

export default ListPage;

// 배경색 매핑
const colorMapping = {
  beige: "#FFE2AD",
  purple: "#ECD9FF",
  blue: "#B1E4FF",
  green: "#D0F5C3",
};

const getHexColor = (apiColor) => {
  return colorMapping[apiColor] || "#FFE2AD";
};

const fetchRecipients = async () => {
  const res = await fetch("https://rolling-api.vercel.app/14-6/recipients/");
  if (!res.ok) throw new Error("데이터 불러오기 실패");
  const data = await res.json();
  return data.results || [];
};
