import { useState } from "react";

import profileImg from "../assets/icons/profile-1.svg";
import Modal from "../components/Modal/Modal";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>모달 등장</button>
      <Modal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileImg={profileImg}
        title={"제목"}
        badge={"동료"}
        date={"2025-03-13"}
        bodyText={
          "오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/오늘 날씨가 좋네요/ 오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/오늘 날씨가 좋네요/ "
        }
      />
    </div>
  );
};

export default HomePage;
