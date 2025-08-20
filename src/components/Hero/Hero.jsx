import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Parenting made simple</h1>
      <p className={styles.subtitle}>Join the waitlist to get early access.</p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Email submitted!");
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Join Waitlist
        </button>
      </form>
    </section>
  );
}
