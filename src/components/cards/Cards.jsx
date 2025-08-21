import React, { memo } from "react";
import styles from "./Cards.module.css";
import cardicon from "../../assets/cardicon.png";

const Cards = () => {
  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
                <div className={styles.iconCircle}>
  <img 
    src={cardicon} 
    alt="icon" 
    className={styles.iconImage} 
    loading="lazy"
    decoding="async"
  />
</div>
          <h3 className={styles.cardTitle}>I'm sorry,<br />what's your name?</h3>
          <p className={styles.cardDescription}>
            School, kinder, daycare, sports and everywhere else you go, remembering names and faces is a full time gig. Getting in touch is another thing all together. 
          </p>
        </div>

        <div className={styles.card}>
                   <div className={styles.iconCircle}>
  <img 
    src={cardicon} 
    alt="icon" 
    className={styles.iconImage} 
    loading="lazy"
    decoding="async"
  />
</div>
          <h3 className={styles.cardTitle}>WhatsApp +<br />CommunicationsChaos</h3>
          <p className={styles.cardDescription}>
            Drowning in group chats, emails, missed messages, and trying to work out which Canva event comes next.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.iconCircle}>
  <img 
    src={cardicon} 
    alt="icon" 
    className={styles.iconImage} 
    loading="lazy"
    decoding="async"
  />
</div>
          <h3 className={styles.cardTitle}>Mental Load<br />Overload</h3>
          <p className={styles.cardDescription}>
            Every birthday, every sport match and practice, every...everything. There is so much on. It all lives in your head, in a family calendar or a random message.
Impossible to keep up.  
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Cards);
