import { useState } from "react";

const validCategories = ["social", "news"];
const validStatuses = ["draft", "scheduled", "published", "archived"];

export default function BroadcastFormModal({ apiBase, token, initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    id: initial?.id || null,
    category: initial?.category || "social",
    title: initial?.title || "",
    summary: initial?.summary || "",
    body_html: initial?.body_html || "",
    image_url: initial?.image_url || "",
    link_url: initial?.link_url || "",
    status: initial?.status || "draft",
    scheduled_at: initial?.scheduled_at || "",
    social_source: initial?.social_source || "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  }

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

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.title || !validCategories.includes(form.category)) {
      setErr("Please provide a title and valid category.");
      return;
    }
    try {
      setSaving(true);
      const body = JSON.stringify({
        category: form.category,
        title: form.title,
        summary: form.summary || null,
        body_html: form.body_html || null,
        image_url: form.image_url || null,
        link_url: form.link_url || null,
        status: validStatuses.includes(form.status) ? form.status : "draft",
        scheduled_at: form.scheduled_at || null,
        social_source: form.category === "social" ? (form.social_source || null) : null,
      });

      if (form.id) {
        await authFetch(`${apiBase}/broadcasts/${form.id}`, { method: "PUT", body });
      } else {
        await authFetch(`${apiBase}/broadcasts`, { method: "POST", body });
      }
      onSaved();
    } catch (e) {
      setErr(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{form.id ? "Edit Broadcast" : "New Broadcast"}</h3>
          <button className="btn ghost" onClick={onClose}>×</button>
        </div>

        {err && <div className="auth-error" role="alert">{err}</div>}

        <form onSubmit={onSubmit} className="form-grid">
          <label>Category</label>
          <select name="category" value={form.category} onChange={onChange}>
            <option value="social">social</option>
            <option value="news">news</option>
          </select>

          {form.category === "social" && (
            <>
              <label>Source</label>
              <select name="social_source" value={form.social_source} onChange={onChange}>
                <option value="">(select)</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter / X</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </select>
            </>
          )}

          <label>Title</label>
          <input name="title" value={form.title} onChange={onChange} required />

          <label>Summary</label>
          <input name="summary" value={form.summary} onChange={onChange} />

          <label>Body (HTML)</label>
          <textarea name="body_html" rows={6} value={form.body_html} onChange={onChange} />

          <label>Image URL</label>
          <input name="image_url" value={form.image_url} onChange={onChange} />

          <label>Link URL</label>
          <input name="link_url" value={form.link_url} onChange={onChange} />

          <label>Status</label>
          <select name="status" value={form.status} onChange={onChange}>
            {validStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <label>Scheduled At</label>
          <input type="datetime-local" name="scheduled_at" value={form.scheduled_at || ""} onChange={onChange} />

          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
