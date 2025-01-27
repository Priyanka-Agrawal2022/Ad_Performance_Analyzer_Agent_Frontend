import { useState } from "react";
import styles from "../styles/Upload.module.css";
import { Link } from "react-router-dom";

export default function Upload(props) {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    if (file.type !== "text/csv") {
      alert("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setFile(null);
        setIsUploaded(true);
        alert("CSV file uploaded successfully!");
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

  return (
    <>
      <div className={styles.uploadDiv}>
        <Link to="/">
          <button className={styles.btn}>Return to Dahsboard</button>
        </Link>

        <h2 className={styles.uploadHeading}>
          Upload a CSV file containing ad data.
        </h2>
        <form
          className={styles.uploadForm}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <input
            type="file"
            name="file"
            accept=".csv"
            disabled={isLoading}
            onChange={handleChange}
          />
          {isUploaded ? (
            <Link to="/analyze">
              <button className={styles.btn}>Analyze</button>
            </Link>
          ) : (
            <button className={styles.btn} type="submit">
              Upload
            </button>
          )}
          {isUploaded && (
            <button className={styles.btn} type="reset">
              Delete
            </button>
          )}
        </form>

        {isLoading && <h2 className={styles.uploadHeading}>Uploading...</h2>}
      </div>
    </>
  );
}
