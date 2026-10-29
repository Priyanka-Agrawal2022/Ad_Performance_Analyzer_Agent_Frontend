import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Upload.module.css";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (f?.type === "text/csv") setFile(f);
    else if (f) alert("Please upload a CSV file.");
  };

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please select a file."); return; }

    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setIsUploaded(true);
      } else {
        alert(`Upload failed: ${result.message}`);
      }
    } catch (error) {
      console.log("Error while uploading file:", error);
      alert("An error occurred while uploading the file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsUploaded(false);
  };

  if (isUploaded) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <span className={styles.successMark}>✓</span>
            <h1 className={styles.successTitle}>File uploaded</h1>
            <p className={styles.successSub}>Your ad data is ready for analysis.</p>
            <div className={styles.successActions}>
              <button className={styles.ctaBtn} onClick={() => navigate("/analyze")}>
                Run Analysis →
              </button>
              <button className={styles.ghostBtn} onClick={handleReset}>
                Upload another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Upload Ad Data</h1>
        <p className={styles.subtitle}>Drop a CSV file with your campaign metrics to get started.</p>
        <form onSubmit={handleSubmit}>
          <label
            className={`${styles.dropzone} ${file ? styles.hasFile : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              name="file"
              accept=".csv"
              disabled={isLoading}
              onChange={handleChange}
              className={styles.hiddenInput}
            />
            {file ? (
              <div className={styles.fileInfo}>
                <span className={styles.fileIcon}>📄</span>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
              </div>
            ) : (
              <>
                <span className={styles.dropIcon}>↑</span>
                <p className={styles.dropLabel}>Drop CSV here or click to browse</p>
                <p className={styles.dropHint}>Accepts .csv files only</p>
              </>
            )}
          </label>
          <button
            className={styles.ctaBtn}
            type="submit"
            disabled={isLoading || !file}
            style={{ width: "100%", marginTop: "16px" }}
          >
            {isLoading ? "Uploading…" : "Upload File →"}
          </button>
        </form>
      </div>
    </main>
  );
}
