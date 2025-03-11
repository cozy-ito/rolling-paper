import { useState } from "react";
import styles from "./ProfileButton.module.css";
import personIcon from "../../assets/icons/person.svg";
import profile1 from "../../assets/imgs/profile-1.png";
import profile2 from "../../assets/imgs/profile-2.png";
import profile3 from "../../assets/imgs/profile-3.png";
import checkIcon from "../../assets/icons/check.svg";

const profileImages = [
  profile1,
  profile2,
  profile3,
  profile1,
  profile2,
  profile3,
];

const ProfileButtons = () => {
  const [profileImage, setProfileImage] = useState(personIcon);
  const [activeProfile, setActiveProfile] = useState(null);

  const handleProfileClick = (image, index) => {
    setProfileImage(image);
    setActiveProfile(index);
  };

  return (
    <div className={styles.profile}>
      <button className={styles.bigProfile}>
        <img
          src={profileImage}
          alt="큰 프로필"
          className={profileImage === personIcon ? styles.bigPersonIcon : ""}
        />
      </button>

      <div className={styles.smallProfiles}>
        {[personIcon, ...profileImages].map((image, index) => (
          <button
            key={index}
            className={`${styles.smallProfile} ${activeProfile === index ? styles.activeProfile : ""}`}
            onClick={() => handleProfileClick(image, index)}
          >
            <img
              src={image}
              alt={`작은 프로필 ${index + 1}`}
              className={image === personIcon ? styles.smallPersonIcon : ""}
            />
            {activeProfile === index && (
              <div className={styles.checkIcon}>
                <img src={checkIcon} alt="체크표시" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileButtons;
