import styles from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.item}>
        <h3>10k+</h3>
        <p>Parents joined</p>
      </div>
      <div className={styles.item}>
        <h3>500+</h3>
        <p>Communities built</p>
      </div>
      <div className={styles.item}>
        <h3>100%</h3>
        <p>Free to get started</p>
      </div>
    </section>
  );
}
