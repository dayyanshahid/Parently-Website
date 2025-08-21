import React, { memo } from "react";
import styles from "./Waitlist.module.css";
import { BACKEND_ENABLED } from "../../config/env";
import { submitWaitlist } from "../../services/waitlistService";

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" stroke="white" strokeOpacity="0.9" />
    <path
      d="M8 12.5l2.5 2.5L16.5 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Waitlist = () => {
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
      firstName: (data.get('firstName') || '').toString().trim(),
      lastName: (data.get('lastName') || '').toString().trim(),
      email: (data.get('email') || '').toString().trim().toLowerCase(),
      country: (data.get('country') || '').toString().trim(),
      phone: (data.get('phone') || '').toString().trim(),
    };

    console.log('[WAITLIST FORM] Extracted payload:', payload);

    try {
      const result = await submitWaitlist(payload);
      console.log('[WAITLIST FORM] Submit result:', result);
      
      if (result.ok) {
        console.log('[WAITLIST FORM] Successfully submitted to waitlist');
      } else if (result.duplicate) {
        console.log('[WAITLIST FORM] Email already registered');
      } else if (result.skipped) {
        console.log('[WAITLIST FORM] Submission skipped (backend disabled)');
      } else {
        console.log('[WAITLIST FORM] Submission failed:', result.error);
      }
    } catch (e) {
      console.error('[WAITLIST FORM] Unexpected error:', e);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="waitlist-heading">
      <div className={styles.container}>
        <h2 id="waitlist-heading" className={styles.heading}>
          Ready to reduce the load?
        </h2>
        <p className={styles.subheading}>
          Be the first to experience family life without the overwhelm
        </p>

        <ul className={styles.benefits} aria-label="Benefits">
          <li className={styles.benefit}>
            <CheckIcon className={styles.check} />
            <strong>100% free</strong>
          </li>
          <li className={styles.benefit}>
            <CheckIcon className={styles.check} />
            <strong>Early Access</strong>
          </li>
          <li className={styles.benefit}>
            <CheckIcon className={styles.check} />
            <strong>Launch Updates</strong>
          </li>
        </ul>

        {/* <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.input}
              aria-label="First Name"
            />
            <input
              type="text"
              placeholder="Last Name"
              className={styles.input}
              aria-label="Last Name"
            />
          </div>

          <div className={styles.row}>
            <input
              type="email"
              placeholder="Email Address"
              className={`${styles.input} ${styles.inputFull}`}
              aria-label="Email Address"
            />
          </div>

          <div className={styles.row}>
            <input
              type="text"
              placeholder="Country"
              className={styles.input}
              aria-label="Country"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className={styles.input}
              aria-label="Phone Number"
            />
          </div>

          <button type="submit" className={styles.button}>
            Join the Waitlist
          </button>
        </form>
      </div> */}
        {/* FORM (drop-in) */}



<div className={styles.form}>
  <form className={styles.heroForm} onSubmit={handleSubmit}>
    
    <div className={styles.inputRow}>
      <input name="firstName" type="text" placeholder="First Name" required autoComplete="given-name" />
      <input name="lastName" type="text" placeholder="Last Name" required autoComplete="family-name" />
    </div>

    <div className={styles.inputRowSingle}>
      <input name="email" type="email" placeholder="Email Address" required autoComplete="email" />
    </div>

    <div className={styles.inputRow}>
      <input name="country" type="text" placeholder="Country" required autoComplete="country-name" />
      <input name="phone" type="tel" placeholder="Phone Number" required autoComplete="tel" />
    </div>

    {/* <div className={styles.checkboxRow}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" required />
        I agree to the <a href="#" className={styles.link}>Terms & Conditions</a> and Privacy Policy
      </label>

      <label className={styles.checkboxLabel}>
        <input type="checkbox" defaultChecked />
        I agree to be notified for Parently's launch
      </label>
    </div> */}

    <button type="submit" className={styles.submitButton}>Join the Waitlist</button>
  </form>
</div>
</div>
            
    </section>
  );
};

export default memo(Waitlist);
