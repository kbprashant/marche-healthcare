import { useState } from "react";

const validKinds = ["social", "news"];
// Backend allows: draft | published | archived
const validStatuses = ["draft", "published", "archived"];

function toLocalInputValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BroadcastFormModal({ apiBase, token, initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    id: initial?.id || null,
    kind: initial?.kind || initial?.category || "social",
    title: initial?.title || "",
    summary: initial?.summary || "",
    body: initial?.body || "",
    status: initial?.status || "draft",
    publish_at: toLocalInputValue(initial?.publish_at),
    social_source: initial?.social_source || "",
    image_path: initial?.image_path || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  }

  async function authFetch(url, init = {}) {
    const headers = { ...(init.headers || {}), Authorization: `Bearer ${token}` };
    // Do not set Content-Type when sending FormData
    const res = await fetch(url, { ...init, headers });
    const text = await res.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch {}
    if (!res.ok) throw new Error((data && data.error) || `HTTP ${res.status}`);
    return { data, status: res.status };
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.title || !validKinds.includes(form.kind)) {
      setErr("Please provide a title and valid category.");
      return;
    }
    try {
      setSaving(true);

      // Build multipart body
      const fd = new FormData();
      fd.append("kind", form.kind);
      fd.append("title", form.title);
      if (form.summary) fd.append("summary", form.summary);
      if (form.body) fd.append("body", form.body);
      if (form.status && validStatuses.includes(form.status)) fd.append("status", form.status);
      if (form.publish_at) {
        // convert local datetime-local to ISO
        fd.append("publish_at", new Date(form.publish_at).toISOString());
      }
      if (form.kind === "social" && form.social_source) fd.append("social_source", form.social_source);
      if (imageFile) fd.append("image", imageFile);

      if (form.id) {
        await authFetch(`${apiBase}/broadcasts/${form.id}`, { method: "PUT", body: fd });
      } else {
        // Image is required on create—enforce in UI
        if (!imageFile) { setErr("Please upload an image."); setSaving(false); return; }
        await authFetch(`${apiBase}/broadcasts`, { method: "POST", body: fd });
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
          <select name="kind" value={form.kind} onChange={onChange}>
            <option value="social">social</option>
            <option value="news">news</option>
          </select>

          {form.kind === "social" && (
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

          <label>Body (HTML allowed)</label>
          <textarea name="body" rows={6} value={form.body} onChange={onChange} />

          <label>Image Upload {form.id ? "(optional on edit)" : "(required)"}</label>
          <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files?.[0] || null)} />

          <label>Status</label>
          <select name="status" value={form.status} onChange={onChange}>
            {validStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <label>Publish At (optional)</label>
          <input
            type="datetime-local"
            name="publish_at"
            value={form.publish_at}
            onChange={onChange}
          />

          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
