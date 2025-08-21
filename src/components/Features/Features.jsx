import React, { memo } from "react";
import styles from "./Features.module.css";

function Features() {
  return (
    <section className={styles.features}>
      <h2 className={styles.heading}>Why Parently?</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Organize</h3>
          <p>Keep track of your child’s events and milestones easily.</p>
        </div>
        <div className={styles.card}>
          <h3>Connect</h3>
          <p>Stay connected with other parents and share experiences.</p>
        </div>
        <div className={styles.card}>
          <h3>Grow</h3>
          <p>Access resources and tips to help your parenting journey.</p>
        </div>
      </div>
    </section>
  );
}

export default memo(Features);
