import React from "react";
import styles from "./components.module.css";

const UserProfileCard = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.UserProfile}>
        <h2>User Profile</h2>
        <h2>{user?.name}</h2>
        <p>{user?.aboutMe}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;