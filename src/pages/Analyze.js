import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Analyze.module.css";

export default function Analyze() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/analyze`);
        const result = await response.json();
        if (result.success) {
          setAnalysisResult(result.data);
        } else {
          alert(`Analysis failed: ${result.message}`);
        }
      } catch (error) {
        console.log("Error while analyzing file:", error);
        alert("An error occurred while analyzing the file. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Ad Performance Analysis</h1>
        <button className={styles.ghostBtn} onClick={() => navigate("/upload")}>
          Upload new file
        </button>
      </div>

      {isLoading && (
        <div className={styles.loadingState}>
          <span className={styles.spinner} aria-hidden="true" />
          <p className={styles.loadingText}>Analyzing your ad data…</p>
        </div>
      )}

      {!isLoading && analysisResult && (
        <div className={styles.results}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Summary</h2>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Ad #</th>
                    <th>ROAS</th>
                    <th>ACOS</th>
                    <th>CTR</th>
                    <th>Conv. Rate</th>
                    <th>Product</th>
                    <th>Analysis</th>
                    <th>Suggestions</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult?.summary?.map((s, i) => (
                    <tr key={i}>
                      <td data-col="num">{s.adNumber}</td>
                      <td data-col="num">{s.roas ?? 0}</td>
                      <td data-col="num">{s.acos ?? 0}</td>
                      <td data-col="num">{s.ctr ?? 0}</td>
                      <td data-col="num">{s.conversionRate ?? 0}</td>
                      <td>{s.product || "—"}</td>
                      <td className={styles.longCell}>{s.analysis || "—"}</td>
                      <td className={styles.longCell}>{s.suggestions || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className={styles.keywordsRow}>
            <section className={`${styles.section} ${styles.keySection}`}>
              <h2 className={`${styles.sectionTitle} ${styles.highTitle}`}>
                High Performing Keywords
              </h2>
              <div className={styles.chips}>
                {analysisResult?.highPerformingKeywords?.length ? (
                  analysisResult.highPerformingKeywords.map((kw, i) => (
                    <span key={i} className={styles.chipHigh}>{kw}</span>
                  ))
                ) : (
                  <p className={styles.emptyNote}>None identified</p>
                )}
              </div>
            </section>

            <section className={`${styles.section} ${styles.keySection}`}>
              <h2 className={`${styles.sectionTitle} ${styles.lowTitle}`}>
                Low Performing Keywords
              </h2>
              <div className={styles.chips}>
                {analysisResult?.lowPerformingKeywords?.length ? (
                  analysisResult.lowPerformingKeywords.map((kw, i) => (
                    <span key={i} className={styles.chipLow}>{kw}</span>
                  ))
                ) : (
                  <p className={styles.emptyNote}>None identified</p>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
