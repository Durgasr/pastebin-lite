import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PasteView.module.css";

const PasteView = ({ pasteId }) => {
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPaste() {
      try {
        const res = await axios.get(
          `https://pastebin-lite-dw5r.onrender.com/api/pastes/${pasteId}`,
          { signal: controller.signal }
        );

        setPaste(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.response?.data?.err || "Paste unavailable");
      }
    }

    fetchPaste();

    return () => {
      controller.abort();
    };
  }, [pasteId]);

  if (error)
    return (
      <div className={styles.card}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  if (!paste)
    return (
      <div className={styles.card}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.card}>
      <pre className={styles.content}>{paste.content}</pre>

      <p>
        Remaining views:{" "}
        {paste.remaining_views === null ? "" : paste.remaining_views}
      </p>

      <p>
        Expires:
        {paste.expires_at ? new Date(paste.expires_at).toLocaleString() : ""}
      </p>
    </div>
  );
};

export default PasteView;
