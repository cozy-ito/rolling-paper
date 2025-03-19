import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ArrowButton from "../../components/ArrowButton/ArrowButton";
import CardList from "../../components/CardList/CardList";
import Spinner from "../../components/Spinner/Spinner";
import useFetchData from "../../hooks/useFetchData";

import styles from "./ListPage.module.css";

const ListPage = () => {
  const navigate = useNavigate();

  // 한 번에 보여줄 카드 개수
  const itemsToShow = 4;

  // 인기 캐러셀 인덱스 상태
  const [popularIndex, setPopularIndex] = useState(0);
  // 최근 캐러셀 인덱스 상태
  const [recentIndex, setRecentIndex] = useState(0);

  // 인기 롤링페이퍼: 서버에서 리액션 많은 순으로 정렬된 데이터를 요청 (sort=like)
  const {
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
    data: popularRecipients,
  } = useFetchData(fetchPopularRecipients);

  // 최근 롤링페이퍼: 기본적으로 최신순으로 정렬된 데이터를 요청
  const {
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    data: recentRecipients,
  } = useFetchData(fetchRecentRecipients);

  // 로딩 상태 처리 (두 섹션 중 하나라도 로딩 중이면 스켈레톤 렌더링)
  if (isLoadingPopular || isLoadingRecent) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonContainer}>
          <div className={styles.title}>인기 롤링 페이퍼 🔥</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <Spinner />
              </div>
            ))}
          </div>
          <div className={styles.title}>최근에 만든 롤링 페이퍼 ⭐️</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <Spinner />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isErrorPopular || isErrorRecent) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonContainer}>
          <div className={styles.title}>인기 롤링 페이퍼 🔥</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <div className={styles.error}>
                  카드리스트를 불러오는데 실패했습니다.
                </div>
              </div>
            ))}
          </div>
          <div className={styles.title}>최근에 만든 롤링 페이퍼 ⭐️</div>
          <div className={styles.skeletonCardListWrapper}>
            {[...Array(1)].map((_, colIndex) => (
              <div key={colIndex} className={styles.skeletonCard}>
                <div className={styles.error}>
                  카드리스트를 불러오는데 실패했습니다.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 null인 경우 빈 배열로 fallback
  const popularData = popularRecipients || [];
  const recentData = recentRecipients || [];

  // 카드 너비와 간격 (css와 일치시켜주세요)
  const cardWidth = 275; // px
  const cardGap = 20; // px
  const totalCardWidth = cardWidth + cardGap; // 한 카드당 차지하는 전체 너비

  // 인기 섹션 좌우 이동 핸들러
  const handlePopularPrev = () => {
    if (popularIndex > 0) {
      setPopularIndex(popularIndex - 4); // 카드 이동 개수
    }
  };
  const handlePopularNext = () => {
    if (popularIndex + itemsToShow < popularData.length) {
      setPopularIndex(popularIndex + 4); // 카드 이동 개수
    }
  };

  // 최근 섹션 좌우 이동 핸들러
  const handleRecentPrev = () => {
    if (recentIndex > 0) {
      setRecentIndex(recentIndex - 4); // 카드 이동 개수
    }
  };
  const handleRecentNext = () => {
    if (recentIndex + itemsToShow < recentData.length) {
      setRecentIndex(recentIndex + 4); // 카드 이동 개수
    }
  };

  return (
    <div className={styles.listPageWrapper}>
      {/* 인기 롤링 페이퍼 섹션 */}
      <div className={styles.title}>인기 롤링 페이퍼 🔥</div>
      <div className={styles.carouselContainer}>
        <div className={styles.arrowLeftButton}>
          {popularIndex === 0 ? null : (
            <ArrowButton direction="left" onClick={handlePopularPrev} />
          )}
        </div>
        <div className={styles.arrowRightButton}>
          {popularIndex + itemsToShow >= popularData.length ? null : (
            <ArrowButton direction="right" onClick={handlePopularNext} />
          )}
        </div>
        <div className={styles.cardListWrapper}>
          <div
            className={styles.cardList}
            style={{
              transform: `translateX(-${popularIndex * totalCardWidth}px)`,
            }}
          >
            {popularData.map((recipient) => {
              const hexColor = getHexColor(recipient.backgroundColor);
              const backgroundImageURL = recipient.backgroundImageURL;
              const dynamicProfileImages =
                recipient.recentMessages?.map((msg) => (
                  <img
                    key={msg.id}
                    src={msg.profileImageURL}
                    alt={msg.sender}
                  />
                )) || [];
              const dynamicBadges =
                recipient.topReactions?.map((reaction) => ({
                  id: `badge-${reaction.id}`,
                  text: reaction.emoji,
                  count: reaction.count,
                })) || [];

              return (
                <div className={styles.card} key={recipient.id}>
                  <div className={styles.cardSnapScroll}>
                    <CardList
                      backgroundColor={hexColor}
                      backgroundImageURL={backgroundImageURL}
                      profileSection={dynamicProfileImages}
                      totalUsers={recipient.messageCount}
                      message={`To. ${recipient.name}`}
                      userMessage={`명이 작성했어요!`}
                      badges={dynamicBadges}
                      onClick={() => navigate(`/post/${recipient.id}`)}
                    />
                  </div>
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
          {recentIndex + itemsToShow >= recentData.length ? null : (
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
            {recentData.map((recipient) => {
              const hexColor = getHexColor(recipient.backgroundColor);
              const backgroundImageURL = recipient.backgroundImageURL;
              const dynamicProfileImages =
                recipient.recentMessages?.map((msg) => (
                  <img
                    key={msg.id}
                    src={msg.profileImageURL}
                    alt={msg.sender}
                  />
                )) || [];
              const dynamicBadges =
                recipient.topReactions?.map((reaction) => ({
                  id: `badge-${reaction.id}`,
                  text: reaction.emoji,
                  count: reaction.count,
                })) || [];

              return (
                <div className={styles.card} key={recipient.id}>
                  <div className={styles.cardSnapScroll}>
                    <CardList
                      backgroundImageURL={backgroundImageURL}
                      backgroundColor={hexColor}
                      profileSection={dynamicProfileImages}
                      totalUsers={recipient.messageCount}
                      message={`To. ${recipient.name}`}
                      userMessage={`명이 작성했어요!`}
                      badges={dynamicBadges}
                      onClick={() => navigate(`/post/${recipient.id}`)}
                    />
                  </div>
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

const fetchPopularRecipients = async (limit = 100) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/recipients/?sort=like&limit=${limit}`,
  );
  if (!res.ok) throw new Error("데이터 불러오기 실패");
  const data = await res.json();
  return data.results || [];
};

const fetchRecentRecipients = async (limit = 100) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/recipients/?limit=${limit}`,
  );
  if (!res.ok) throw new Error("데이터 불러오기 실패");
  const data = await res.json();
  return data.results || [];
};
