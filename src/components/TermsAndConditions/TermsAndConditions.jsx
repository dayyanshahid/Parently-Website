import React, { memo } from "react";
import styles from "./TermsAndConditions.module.css";
import BackButton from "../BackButton/BackButton";

function TermsAndConditions() {
  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <p className={styles.lastUpdated}>Last updated: December 2024</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p className={styles.paragraph}>
            By accessing and using Parently ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Description of Service</h2>
          <p className={styles.paragraph}>
            Parently is an AI-powered Family Life Admin Assistant designed to help busy parents manage their family's activities, connect with other families, coordinate events, and streamline daily tasks. The service includes features such as family directory, event coordination, group gifting, task management, and voice assistance.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. User Accounts and Registration</h2>
          <p className={styles.paragraph}>
            To access certain features of Parently, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Privacy and Data Protection</h2>
          <p className={styles.paragraph}>
            We take your privacy seriously. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Parently, you consent to the collection and use of your information as outlined in our Privacy Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. User Conduct</h2>
          <p className={styles.paragraph}>
            You agree to use Parently only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className={styles.list}>
            <li>Use the service for any illegal or unauthorized purpose</li>
            <li>Transmit any harmful, threatening, abusive, or defamatory content</li>
            <li>Attempt to gain unauthorized access to other user accounts or our systems</li>
            <li>Interfere with or disrupt the service or servers connected to the service</li>
            <li>Use the service to spam or send unsolicited communications</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Content and Intellectual Property</h2>
          <p className={styles.paragraph}>
            All content, features, and functionality of Parently, including but not limited to text, graphics, logos, images, and software, are owned by Parently and are protected by copyright, trademark, and other intellectual property laws. You retain ownership of any content you submit to the service, but grant us a license to use, modify, and display such content as necessary to provide the service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Service Availability</h2>
          <p className={styles.paragraph}>
            We strive to maintain high availability of our service, but we do not guarantee that Parently will be available at all times. The service may be temporarily unavailable due to maintenance, updates, or technical issues. We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Limitation of Liability</h2>
          <p className={styles.paragraph}>
            To the fullest extent permitted by law, Parently shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with your use of the service. Our total liability shall not exceed the amount paid by you for the service in the twelve months preceding the claim.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Indemnification</h2>
          <p className={styles.paragraph}>
            You agree to indemnify and hold harmless Parently, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising out of your use of the service, your violation of these Terms, or your violation of any rights of another party.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Termination</h2>
          <p className={styles.paragraph}>
            We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the service will cease immediately.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Changes to Terms</h2>
          <p className={styles.paragraph}>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the service after such modifications constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Governing Law</h2>
          <p className={styles.paragraph}>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Contact Information</h2>
          <p className={styles.paragraph}>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <div className={styles.contactInfo}>
            <p>Email: legal@parently.com</p>
            <p>Address: [Your Company Address]</p>
            <p>Phone: [Your Contact Number]</p>
          </div>
        </section>

        <div className={styles.footer}>
          <p>By using Parently, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.</p>
        </div>
      </div>
    </div>
  );
}

export default memo(TermsAndConditions);
