import { useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function BroadcastFormModal({ initial = {}, onClose, onSaved }) {
  const [model, setModel] = useState({
    id: initial.id || undefined,
    category: initial.category || "social",
    title: initial.title || "",
    summary: initial.summary || "",
    body_html: initial.body_html || "",
    image_url: initial.image_url || "",
    link_url: initial.link_url || "",
    status: initial.status || "draft",
    scheduled_at: initial.scheduled_at ? String(initial.scheduled_at).replace(" ", "T") : ""
  });
  const [saving, setSaving] = useState(false);
  const isEdit = !!model.id;

  const setField = (k, v) => setModel((m) => ({ ...m, [k]: v }));

  const canSave = useMemo(
    () => model.title.trim().length > 0 && (model.category === "social" || model.category === "news"),
    [model]
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!canSave) return;

    setSaving(true);
    try {
      // NOTE: admin path
      const res = await fetch(`${API_BASE}/broadcasts_save.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...model,
          scheduled_at: model.scheduled_at ? model.scheduled_at : null
        })
      });
      const data = await res.json();
      if (data?.ok) onSaved();
      else alert(data?.error || "Save failed");
    } catch (e2) {
      console.error(e2);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? "Edit Broadcast" : "New Broadcast"}</h3>
          <button className="iconbtn" onClick={onClose}>✕</button>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="grid cols-2">
            <label>Category
              <select value={model.category} onChange={(e)=>setField('category', e.target.value)}>
                <option value="social">Social Media</option>
                <option value="news">News & Events</option>
              </select>
            </label>

            <label>Status
              <select value={model.status} onChange={(e)=>setField('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          </div>

          <label>Title
            <input value={model.title} onChange={(e)=>setField('title', e.target.value)} placeholder="Title" required />
          </label>

          <label>Summary
            <textarea rows={3} value={model.summary} onChange={(e)=>setField('summary', e.target.value)} placeholder="Short summary" />
          </label>

          <label>Body (HTML allowed)
            <textarea rows={6} value={model.body_html} onChange={(e)=>setField('body_html', e.target.value)} placeholder="<p>Optional rich body</p>" />
          </label>

          <div className="grid cols-2">
            <label>Image URL
              <input value={model.image_url} onChange={(e)=>setField('image_url', e.target.value)} placeholder="https://…" />
            </label>
            <label>Link URL
              <input value={model.link_url} onChange={(e)=>setField('link_url', e.target.value)} placeholder="https://…" />
            </label>
          </div>

          <label>Schedule (optional)
            <input type="datetime-local" value={model.scheduled_at} onChange={(e)=>setField('scheduled_at', e.target.value)} />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={!canSave || saving}>{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
