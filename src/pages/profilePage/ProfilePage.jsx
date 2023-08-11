import React, { useState } from "react";
import Header from "../../components/header/Header";
import styles from "../../styles/style";
import ProfileSidebar from "../../components/profileSidebar/ProfileSidebar";
import ProfileContent from "../../components/profileContent/ProfileContent";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.custom_container}  mt-[40px]`}>
        <div className="flex gap-5 md:gap-10">
          <div className="50px md:w-[25%]">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <div className="w-full md:w-[75%]">
            <ProfileContent active={active} setActive={setActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
