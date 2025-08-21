import React, { memo, useMemo } from "react";
import styles from "./Streamline.module.css";
import brain from "../../assets/brain.png"
import bell from "../../assets/bell.png"
import voice from "../../assets/voice.png"
import network from "../../assets/network.png"
import gift from "../../assets/gift.png"
import stack from "../../assets/stack.png"

const Streamline = () => {
  const features = useMemo(() => [
    {
      title: "Your Family Brain",
      desc:
        "Upload a screenshot, forward and email or simply add it into your Parently. Stay ontop of everything, all in the one place",
      alt: "Your Family Brain icon",
      icon: brain
    },
    {
      title: "Smart Reminders",
      desc:
        "Never miss important moments with AI-powered reminders that adapt to your family’s routine.",
      alt: "Smart Reminders icon",
      icon: bell
    },
    {
      title: "Voice Assistant",
      desc:
        "Add tasks, set reminders, and manage your family schedule using simple voice commands.",
      alt: "Voice Assistant icon",
      icon: voice
    },
    {
      title: "Parently Network Directory",
      desc:
        "Choose to connect with your kids network. Each complete Family profile provides parents with the ability to find, connect and contact. Set your permissions, and decide how you want to Parently.",
      alt: "Parently Network Directory icon",
      icon: network
    },
    {
      title: "Group Gifting + Contributions",
      desc:
        "Joint presents and collecting funds has never been so easy. Nominate yourself, or be nominated, to receive funds through our secure payment gateway.",
      alt: "Group Gifting + Contributions icon",
      icon: gift
    },
    {
      title: "Cross-Platform",
      desc: "Access Parently from any device - iOS, Android, or web browser.",
      alt: "Cross-Platform icon",
      icon: stack
    }
  ], []);

  return (
    <section className={styles.section} aria-labelledby="streamline-heading">
      <div className={styles.container}>
        <h2 id="streamline-heading" className={styles.heading}>
          Streamline the madness
        </h2>

        <div className={styles.grid}>
          {features.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.iconTile}>
                  {item.icon ? (
                    <img
                      className={styles.icon}
                      src={item.icon}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.iconPlaceholder} aria-hidden="true" />
                  )}
                </div>

                <div className={styles.text}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Streamline);
