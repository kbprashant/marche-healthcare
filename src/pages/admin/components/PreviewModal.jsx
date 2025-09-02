import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function PreviewModal({ id, onClose }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/broadcasts_get.php?id=${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data?.ok) setItem(data.item);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  return (
    <div className="modal-backdrop">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h3>Preview</h3>
          <button className="iconbtn" onClick={onClose}>✕</button>
        </div>

        {!item ? (
          <div style={{ padding: 20 }}>Loading…</div>
        ) : (
          <div className="preview">
            <div className="badge">{item.category}</div>
            <div className={`badge ${item.status}`}>{item.status}</div>
            <h2 style={{ marginTop: 10 }}>{item.title}</h2>
            {item.image_url ? (
              <img
                src={item.image_url}
                alt=""
                style={{ maxWidth: "100%", borderRadius: 8, margin: "12px 0" }}
              />
            ) : null}
            {item.summary ? <p style={{ opacity: 0.85 }}>{item.summary}</p> : null}
            {item.body_html ? (
              <div dangerouslySetInnerHTML={{ __html: item.body_html }} />
            ) : null}
            {item.link_url ? (
              <p>
                <a href={item.link_url} target="_blank" rel="noreferrer">
                  Open Link ↗
                </a>
              </p>
            ) : null}
            <small>Scheduled: {item.scheduled_at || "—"}</small>
          </div>
        )}
      </div>
    </div>
  );
}
