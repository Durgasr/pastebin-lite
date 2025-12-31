import { useState } from "react";
import axios from "axios";
import styles from "./PasteForm.module.css";

const PasteForm = () => {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState(null);
  const [maxViews, setMaxViews] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        content: content,
        ttl_seconds: ttl > 0 ? parseInt(ttl) : undefined,
        max_views: maxViews > 0 ? parseInt(maxViews) : undefined,
      };

      const res = await axios.post(
        "https://pastebin-lite-dw5r.onrender.com/api/pastes",
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUrl(res.data.url);
      setContent("");
      setTtl("");
      setMaxViews("");
    } catch (err) {
      setError(err.response?.data?.err || "Failed to create paste");
    }
  };

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <textarea
          className={styles.textarea}
          placeholder="Enter your paste..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <input
          className={styles.formInput}
          type="number"
          min="1"
          placeholder="TTL (seconds)"
          value={ttl}
          onChange={(e) => setTtl(e.target.value)}
        />

        <input
          className={styles.formInput}
          type="number"
          min="1"
          placeholder="Max views"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />

        <button type="submit" className={styles.createButton}>
          Create Paste
        </button>

        {url && (
          <div className={styles.result}>
            <p>Shareable URL: </p>
            <a href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default PasteForm;
