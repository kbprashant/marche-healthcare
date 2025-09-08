import { useEffect, useState } from "react";
import "../admin-css/modals/base.css";
import "../admin-css/modals/preview.css";

export default function PreviewModal({ id, apiBase, token, onClose }) {
  const [item, setItem] = useState(null);

  async function authFetch(url, init = {}) {
    const headers = {
      ...(init.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(url, { ...init, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await authFetch(`${apiBase}/broadcasts/${id}`);
        if (data?.ok) setItem(data.item);
      } catch (e) { console.error(e); }
    })();
  }, [apiBase, id]);

  function handleKeyDown(e) {
    if (e.key === "Escape") onClose();
  }

  return (
    <div className="modal-backdrop preview-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3 id="preview-title">Preview</h3>
          <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {!item ? (
            <div>Loading…</div>
          ) : (
            <div className="preview" aria-labelledby="preview-title">
              <h4 className="preview-title">{item.title}</h4>

              {item.image_url && (() => {
                const apiOrigin = apiBase?.startsWith("http") ? new URL(apiBase).origin : window.location.origin;
                const imgSrc = item.image_url.startsWith("http") ? item.image_url : `${apiOrigin}${item.image_url}`;
                return <img className="preview-media" alt="" src={imgSrc} />;
              })()}

              <div className="rich" dangerouslySetInnerHTML={{ __html: item.body_html || "" }} />
              {item.link_url && (
                <p style={{ marginTop: 10 }}>
                  <a href={item.link_url} target="_blank" rel="noreferrer">{item.link_url}</a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}