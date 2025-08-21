import React, { memo } from "react";
import styles from "./PrivacyPolicy.module.css";
import BackButton from "../BackButton/BackButton";

function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: December 2024</p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Introduction</h2>
          <p className={styles.paragraph}>
            At Parently, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered Family Life Admin Assistant service.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
          
          <h3 className={styles.subTitle}>2.1 Personal Information</h3>
          <p className={styles.paragraph}>
            We may collect the following types of personal information:
          </p>
          <ul className={styles.list}>
            <li>Name and contact information (email address, phone number)</li>
            <li>Family member information (names, ages, relationships)</li>
            <li>Location data (country, city for local services)</li>
            <li>Profile information and preferences</li>
            <li>Communication history and messages</li>
          </ul>

          <h3 className={styles.subTitle}>2.2 Usage Information</h3>
          <p className={styles.paragraph}>
            We automatically collect information about how you use our service, including:
          </p>
          <ul className={styles.list}>
            <li>Device information (type, operating system, browser)</li>
            <li>IP address and general location</li>
            <li>Usage patterns and feature interactions</li>
            <li>Log files and analytics data</li>
          </ul>

          <h3 className={styles.subTitle}>2.3 Content Information</h3>
          <p className={styles.paragraph}>
            When you use Parently, we may collect:
          </p>
          <ul className={styles.list}>
            <li>Photos and videos you upload to event walls</li>
            <li>Voice recordings for voice assistant features</li>
            <li>Calendar and event information</li>
            <li>Task lists and family schedules</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p className={styles.paragraph}>
            We use the collected information for the following purposes:
          </p>
          <ul className={styles.list}>
            <li>Provide and maintain our AI-powered family assistant service</li>
            <li>Personalize your experience and improve our features</li>
            <li>Facilitate family directory connections and event coordination</li>
            <li>Process group gifts and financial contributions securely</li>
            <li>Send notifications about events, updates, and service announcements</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Analyze usage patterns to improve our service</li>
            <li>Ensure security and prevent fraud or abuse</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Information Sharing and Disclosure</h2>
          
          <h3 className={styles.subTitle}>4.1 Family Network Sharing</h3>
          <p className={styles.paragraph}>
            Within the Parently Directory, you can choose to share certain profile information with other families in your network based on your privacy settings and permissions.
          </p>

          <h3 className={styles.subTitle}>4.2 Service Providers</h3>
          <p className={styles.paragraph}>
            We may share your information with trusted third-party service providers who assist us in operating our service, including:
          </p>
          <ul className={styles.list}>
            <li>Cloud hosting and data storage providers</li>
            <li>Payment processing services for group contributions</li>
            <li>Analytics and performance monitoring services</li>
            <li>Customer support platforms</li>
          </ul>

          <h3 className={styles.subTitle}>4.3 Legal Requirements</h3>
          <p className={styles.paragraph}>
            We may disclose your information if required by law, court order, or government request, or to protect our rights, property, or safety, or that of our users or the public.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Data Security</h2>
          <p className={styles.paragraph}>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className={styles.list}>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Access controls and authentication systems</li>
            <li>Secure payment processing for financial transactions</li>
            <li>Regular backups and disaster recovery procedures</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Children's Privacy</h2>
          <p className={styles.paragraph}>
            Parently is designed for use by parents and guardians. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have inadvertently collected information from a child under 13, please contact us immediately so we can delete such information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Your Privacy Rights</h2>
          <p className={styles.paragraph}>
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className={styles.list}>
            <li>Access: Request a copy of the personal information we hold about you</li>
            <li>Correction: Request correction of inaccurate or incomplete information</li>
            <li>Deletion: Request deletion of your personal information</li>
            <li>Portability: Request transfer of your data to another service</li>
            <li>Restriction: Request limitation of processing of your information</li>
            <li>Objection: Object to certain types of processing</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Cookies and Tracking Technologies</h2>
          <p className={styles.paragraph}>
            We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences, though some features may not function properly if cookies are disabled.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Data Retention</h2>
          <p className={styles.paragraph}>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. We will delete or anonymize your information when it is no longer needed, unless we are required to retain it for legal or regulatory purposes.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. International Data Transfers</h2>
          <p className={styles.paragraph}>
            Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Changes to This Privacy Policy</h2>
          <p className={styles.paragraph}>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Contact Us</h2>
          <p className={styles.paragraph}>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <div className={styles.contactInfo}>
            <p>Email: privacy@parently.com</p>
            <p>Data Protection Officer: dpo@parently.com</p>
            <p>Address: [Your Company Address]</p>
            <p>Phone: [Your Contact Number]</p>
          </div>
        </section>

        <div className={styles.footer}>
          <p>By using Parently, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.</p>
        </div>
      </div>
    </div>
  );
}

export default memo(PrivacyPolicy);
