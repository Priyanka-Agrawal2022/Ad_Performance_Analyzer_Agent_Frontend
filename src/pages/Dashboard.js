import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

const FEATURES = [
  {
    metric: "Click-Through Rate",
    label: "CTR Analysis",
    desc: "Identify which ads capture attention and drive clicks, so you know where attention is going.",
  },
  {
    metric: "Impressions & Views",
    label: "Engagement Metrics",
    desc: "Understand how viewers interact with your ads and which placements see real engagement.",
  },
  {
    metric: "Conversion Rate",
    label: "Conversion Tracking",
    desc: "Track the full journey from first click through to purchase and surface drop-off points.",
  },
  {
    metric: "ROAS · ACOS",
    label: "Keyword Performance",
    desc: "Surface high-ROAS keywords and flag underperformers so you can reallocate budget quickly.",
  },
];

export default function Dashboard() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>AI-POWERED ANALYTICS</p>
          <h1 className={styles.headline}>
            Ad Performance<br />Analyzer
          </h1>
          <p className={styles.sub}>
            Upload a single CSV and get a clear picture of what's working —
            ROAS, ACOS, CTR, conversion rate, and keyword-level insights in one pass.
          </p>
          <Link to="/upload">
            <button className={styles.cta}>Start Analyzing →</button>
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>What it analyzes</h2>
        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <article key={f.label} className={styles.card}>
              <p className={styles.cardMetric}>{f.metric}</p>
              <h3 className={styles.cardLabel}>{f.label}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
