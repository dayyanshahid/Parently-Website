import React, { memo } from "react";
import styles from "./Hero.module.css";
import phoneImage from "../../assets/IPHONEY.png";
import { FaRegCheckCircle } from "react-icons/fa";

function Hero() {
  const features = [
    "Connect faces (and names!) to families via Parently Directory",
    "Take the pain out of event coordination + group gifting",
    "Manage the endless to do’s and crazy family schedules",
    "Provide updates on the go via voice, chat or lists",
  ];

  return (
    <section className={styles.hero}>
      {/* Left view */}
      <div className={styles.leftView}>
        <>
  <div className={styles.bigTitle}>Turn down the noise</div>
  <div className={styles.bigTitle1}>Outsource the</div>


        </>
        <div className={styles.gradientTitle}>
          <stong>Mental Load</stong>
        </div>
        <div className={styles.marketingText}>
          We understand the communication chaos parents face daily, and the juggle that comes with it. So we created Parently, your AI-powered Family Life Admin Assistant, designed to make life easier.
        </div>
        <>
        <div className={styles.marketingText2}>Packed with features and <strong>100% FREE</strong>,</div>
        </>
         <>
        <div className={styles.marketingText3}>Parently helps busy parents:</div>
        </>

        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <FaRegCheckCircle className={styles.checkIcon} />
              {feature}
            </li>
          ))}
        </ul>

        {/* Gradient strip with white circles */}
        <div className={styles.gradientStrip}>
          <div className={styles.stripCircle}></div>
          <div className={styles.stripText}>
            Parently. Made for busy Parents. Sign up for early access
          </div>
          <div className={styles.stripCircle}></div>
        </div>

        {/* Form container */}
        <div className={styles.formContainer}>
          <form className={styles.heroForm} onSubmit={(e) => e.preventDefault()}>
            {/* Name fields */}
            <div className={styles.inputRow}>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>

            {/* Email field */}
            <input type="email" placeholder="Email Address" required />

            {/* Country & Phone */}
            <div className={styles.inputRow}>
              <input type="text" placeholder="Country" required />
              <input type="tel" placeholder="Phone Number" required />
            </div>

            {/* Checkboxes */}
<label className={styles.checkboxLabel}>
  <input type="checkbox" required className={styles.customCheckbox} />
  <span className={styles.checkmark}></span>
  I agree to the <a href="/terms" className={styles.link}>Terms & Conditions</a> and <a href="/privacy" className={styles.link}>Privacy Policy</a>
</label>

<label className={styles.checkboxLabel}>
  <input type="checkbox" defaultChecked className={styles.customCheckbox} />
  <span className={styles.checkmark}></span>
  I agree to be notified for Parently's launch
</label>


            {/* Submit button */}
            <button type="submit" className={styles.submitButton}>
              Join the Waitlist
            </button>
          </form>
        </div>
      </div>

      {/* Right view */}
      <div className={styles.rightView}>
        <img src={phoneImage} alt="Parently app on phone" className={styles.phoneImage} loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
export default memo(Hero);
