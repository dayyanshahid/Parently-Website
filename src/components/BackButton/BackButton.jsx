import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <button onClick={handleBack} className={styles.backButton}>
      <svg 
        className={styles.backIcon} 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7"/>
        <path d="M19 12H5"/>
      </svg>
      Back to Home
    </button>
  );
}

export default memo(BackButton);
