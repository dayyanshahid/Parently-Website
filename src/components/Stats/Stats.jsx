import { memo, useEffect, useState } from "react";
import styles from "./Stats.module.css";
import { BACKEND_ENABLED } from "../../config/env";
import { getWaitlistCount } from "../../services/waitlistService";

function Stats() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    console.log('[STATS COMPONENT] useEffect triggered, BACKEND_ENABLED:', BACKEND_ENABLED);
    
    if (!BACKEND_ENABLED) {
      console.log('[STATS COMPONENT] Backend disabled, using static fallback');
      return;
    }
    
    let mounted = true;
    (async () => {
      console.log('[STATS COMPONENT] Fetching waitlist count...');
      const c = await getWaitlistCount();
      console.log('[STATS COMPONENT] Received count:', c);
      
      if (mounted && Number.isFinite(c)) {
        console.log('[STATS COMPONENT] Setting count to:', c);
        setCount(c);
      } else if (mounted) {
        console.log('[STATS COMPONENT] Count not finite or component unmounted, keeping fallback');
      }
    })();
    return () => {
      console.log('[STATS COMPONENT] Cleanup: setting mounted to false');
      mounted = false;
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="stats-heading">
      <div className={styles.container}>
        <h2 id="stats-heading" className={styles.heading}>
          Join hundreds of families ready for Parently
        </h2>
        <p className={styles.subheading}>Let’s take care of your life admin.</p>

        <div className={styles.row}>
          <div className={styles.item}>
            <div className={styles.number}>{count !== null ? count : "200+"}</div>
            <div className={styles.label}>Eager Parents</div>
          </div>
          <div className={styles.item}>
            <div className={styles.number}>10+</div>
            <div className={styles.label}>Features Planned</div>
          </div>
          <div className={styles.item}>
            <div className={styles.number}>Q3.2025.</div>
            <div className={styles.label}>Launch</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Stats);
