import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Analyze.module.css";

export default function Analyze(props) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch("http://localhost:8000/analyze");
        const result = await response.json();

        if (result.success) {
          setAnalysisResult(result.data);
          console.log(result.data);
        } else {
          alert(`Analysis failed: ${result.message}`);
        }
      } catch (error) {
        console.log("Error while analyzing file:", error);
        alert("An error occurred while analyzing the file. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className={styles.analysisDiv}>
        <div className={styles.btnsDiv}>
          <Link to="/">
            <button className={styles.btn}>Return to Dahsboard</button>
          </Link>

          <Link to="/upload">
            <button className={styles.btn}>Upload a new file</button>
          </Link>
        </div>

        <h1 className={styles.analysisTitle}>Ad Performance Analysis</h1>

        {isLoading ? (
          <h2 className={styles.analysisHeading}>Analyzing...</h2>
        ) : (
          analysisResult && (
            <>
              <div className={styles.summaryDiv}>
                <h2 className={styles.analysisHeading}>Analysis Summary</h2>

                <table className={styles.analysisTable}>
                  <thead>
                    <tr>
                      <th>Ad Number</th>
                      <th>ROAS</th>
                      <th>ACOS</th>
                      <th>CTR</th>
                      <th>Conversion Rate</th>
                      <th>Product</th>
                      <th>Analysis</th>
                      <th>Suggestions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {analysisResult?.summary?.map((s, i) => (
                      <tr key={i}>
                        <td>{s.adNumber}</td>
                        <td>{s.roas ?? 0}</td>
                        <td>{s.acos ?? 0}</td>
                        <td>{s.ctr ?? 0}</td>
                        <td>{s.conversionRate ?? 0}</td>
                        <td>{s.product || ""}</td>
                        <td>{s.analysis || ""}</td>
                        <td>{s.suggestions || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.keywords}>
                <div className={styles.high}>
                  <h2 className={styles.analysisHeading}>
                    High Performing Keywords
                  </h2>
                  <ul>
                    {analysisResult?.highPerformingKeywords?.map((hk, i) => (
                      <li key={i}>{hk}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.low}>
                  <h2 className={styles.analysisHeading}>
                    Low Performing Keywords
                  </h2>
                  <ul>
                    {analysisResult?.lowPerformingKeywords?.map((lk, i) => (
                      <li key={i}>{lk}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}
