import { use, useState } from "react";
import axios from "axios";
import styles from "./PasteForm.module.css";

const PasteForm = () => {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        content: content,
        ttl_seconds: ttl,
        max_views: maxViews > 0 ? parseInt(maxViews) : undefined,
      };

      const res = await axios.post("http://localhost:3700/api/pastes", body, {
        headers: { "Content-Type": "application/json" },
      });
      setUrl(res.data.url);
    } catch (err) {
      setError(err.response?.data?.err || "Failed to create paste");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <textarea
        className={styles.textarea}
        placeholder="Enter your paste..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <input
        className={styles.input}
        type="number"
        min="1"
        placeholder="TTL (seconds)"
        value={ttl}
        onChange={(e) => setTtl(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="number"
        min="1"
        placeholder="Max views"
        value={maxViews}
        onChange={(e) => setMaxViews(e.target.value)}
        required
      />

      <button type="submit" className={styles.button}>
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
  );
};
