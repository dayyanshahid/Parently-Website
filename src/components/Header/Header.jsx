import React, { memo } from "react";
import { FaArrowRight } from "react-icons/fa"; // Importing the right arrow icon
import styles from "./Header.module.css";

const Header = ({ onContactClick }) => {
  return (
    <header className={styles.header}>
      {/* Logo and text on the left */}
      <div className={styles.headerLeft}>
        <span className={styles.headerLogo}>PARENTLY</span>
        <span className={styles.headersublogo}>YOUR LIFE ADMIN ASSISTANT</span>
      </div>

      {/* Contact Button on the right */}
      <div className={styles.headerRight}>
        <button onClick={onContactClick} className={styles.headerButton}>
          <span>Get in Touch</span>
          <span className={styles.arrowCircle}>
            <FaArrowRight size={14} color="#ff00f7ff" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default memo(Header);
