import styles from "../styles/Dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard(props) {
  return (
    <>
      <div className={styles.bannerDiv}>
        <div className={styles.centerDiv}>
          <h1 className={styles.title}>🤖Ad Performance Analyzer Agent</h1>
          <p className={styles.subtitle}>
            Struggling to boost ad ROI?<br></br>Our AI Ad Analyzer maximizes
            your results effortlessly!
          </p>
          <Link to="/upload">
            <button className={styles.btn}>Start with AI</button>
          </Link>
        </div>
      </div>

      <div className={styles.descDiv}>
        <h3 className={styles.title}>
          What Is an Ad Performance Analyzer Agent?
        </h3>
        <p className={styles.content}>
          An Ad Performance Analyzer Agent is a web application that allows a
          user to upload an ad data. The application will then analyze the ad
          data and provide a summary of the ad's performance based on the
          analysis and agent will create one or more tasks based on the outcome.
          Agent will check which keywords are high performing and which keywords
          are low performing. Keywords exhibiting a high ROAS, low ACOS, high
          CTR, and a strong click-to-purchase conversion rate are indicative of
          high performance.
        </p>
        <p className={styles.content}>
          Here’s what this agent can do for you:
        </p>
        <ul className={styles.list}>
          <li>
            Analyze click-through rates to identify which ads capture attention
            and drive action.
          </li>
          <li>
            Examine engagement metrics to understand how viewers interact with
            your ads.
          </li>
          <li>
            Evaluate conversion data to track the journey from viewer to
            customer.
          </li>
          <li>
            Analyze which keywords are high performing and which keywords are
            low performing.
          </li>
        </ul>
      </div>
    </>
  );
}
