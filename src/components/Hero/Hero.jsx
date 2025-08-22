import React, { memo } from "react";
import styles from "./Hero.module.css";
import phoneImage from "../../assets/IPHONEY.png";
import { FaRegCheckCircle } from "react-icons/fa";
import { BACKEND_ENABLED } from "../../config/env";
import { submitWaitlist } from "../../services/waitlistService";

function Hero() {
  const features = [
    "Connect faces (and names!) to families via Parently Directory",
    "Take the pain out of event coordination + group gifting",
    "Manage the endless to do’s and crazy family schedules",
    "Provide updates on the go via voice, chat or lists",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[WAITLIST FORM] Form submitted');
    
    if (!BACKEND_ENABLED) {
      console.log('[WAITLIST FORM] Backend disabled, preventing default only');
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: ((data.get('firstName') || data.get('first_name') || '')).toString().trim(),
      lastName: ((data.get('lastName') || data.get('last_name') || '')).toString().trim(),
      email: ((data.get('email') || '')).toString().trim().toLowerCase(),
      country: ((data.get('country') || '')).toString().trim(),
      phone: ((data.get('phone') || data.get('phone_number') || '')).toString().trim(),
    };

    console.log('[WAITLIST FORM] Extracted payload:', payload);

    try {
      const result = await submitWaitlist(payload);
      console.log('[WAITLIST FORM] Submit result:', result);
      
      if (result.ok) {
        console.log('[WAITLIST FORM] Successfully submitted to waitlist');
        // Minimal UX feedback without changing styling structure
        alert('Thanks! You are already on the waitlist.');
      } else if (result.duplicate) {
        console.log('[WAITLIST FORM] Email already registered');
        // Show popup when server responds 409 Conflict (duplicate)
        alert('You are already registered on the waitlist with this email.');
      } else if (result.skipped) {
        console.log('[WAITLIST FORM] Submission skipped (backend disabled)');
      } else {
        console.log('[WAITLIST FORM] Submission failed:', result.error);
        alert(`Submission failed: ${result.error || 'Please try again later.'}`);
      }
    } catch (e) {
      console.error('[WAITLIST FORM] Unexpected error:', e);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Left view */}
      <div className={styles.leftView}>
        <>
  <div className={styles.bigTitle}>Turn down the noise</div>
  <div className={styles.bigTitle1}>Outsource the</div>


        </>
        <div className={styles.gradientTitle}>
          <strong>Mental Load</strong>
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
          <form className={styles.heroForm} onSubmit={handleSubmit}>
            {/* Name fields */}
            <div className={styles.inputRow}>
              <input name="firstName" type="text" placeholder="First Name" required autoComplete="given-name" />
              <input name="lastName" type="text" placeholder="Last Name" required autoComplete="family-name" />
            </div>

            {/* Email field */}
            <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />

            {/* Country & Phone */}
            <div className={styles.inputRow}>
              <input name="country" type="text" placeholder="Country" required autoComplete="country-name" />
              <input name="phone" type="tel" placeholder="Phone Number" required autoComplete="tel" />
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
