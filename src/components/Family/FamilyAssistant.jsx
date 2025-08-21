import React, { memo } from "react";
import styles from "./FamilyAssistant.module.css";
import iphones from "../../assets/iphones.png";

const FamilyAssistant = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        {/* Left Side Text */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Your Family <br />
            Life Admin Assistant. <br />
            Built to help.
          </h2>

          <div className={styles.textBlock}>
            <h3 className={styles.subtitle}>Parently Directory</h3>
            <p className={styles.paragraph}>
              Search family profiles in your Parently Directory to connect faces
              (and names) to families. No more guessing or mistaken identity,
              complete family profiles connect parents with children, and groups
              – PC, year levels, teams, lessons, childcare, events.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3 className={styles.subtitle}>Events Made Easy</h3>
            <p className={styles.paragraph}>
              Create, invite, and coordinate parties, playdates, and sports (and
              more) without the chaos. Handle group gifts and contributions
              without the messy reconciliation and painful individual transfers.
              Upload pics and videos to your event wall, to access all in one
              place.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3 className={styles.subtitle}>24/7 Life Admin Assistant</h3>
            <p className={styles.paragraph}>
              Like your family’s brain, Parently organises your family’s
              activities automatically – from to-dos to events all in one place.
              Syncing with your calendars, you can choose to engage as much as
              you want.
            </p>
          </div>

          <div className={styles.textBlock}>
            <h3 className={styles.subtitle}>Your Family, Your Way</h3>
            <p className={styles.paragraph}>
              Busy morning? Ask Parently for a voice updates while driving. Need
              quick chats between meetings? With Parently you can talk, type and
              review all of your tasks, up coming events, and add more in. With
              Parently we work with you.
            </p>
          </div>
        </div>

        {/* Right Side Devices */}
        <div className={styles.devices}>
          <img
            src={iphones}
            alt="device1"
            className={styles.device}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(FamilyAssistant);
