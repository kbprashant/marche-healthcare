// src/pages/admin/components/CareerFormModal.jsx
import { useEffect, useState } from "react";
import "../admin-css/modals/base.css";
import "../admin-css/modals/career.css";

export default function CareerFormModal({ open, onClose, API_BASE, editId, onSaved, token }) {
  const [form, setForm] = useState({
    title: "",
    category: "fulltime",           // ✅ only fulltime|internship
    status: "draft",
    location: "",
    experience: "",
    salary: "",
    skills: "",
    apply_url: "",
    apply_email: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function authFetch(url, init = {}) {
    const headers = { ...(init.headers || {}), Authorization: `Bearer ${token}` };
    if (!(init.body instanceof FormData)) headers["Content-Type"] = "application/json";
    const res = await fetch(url, { ...init, headers });   // ✅ no credentials here
    const text = await res.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch {}
    if (!res.ok) throw new Error((data && data.error) || `HTTP ${res.status}`);
    return { data, status: res.status };
  }

  useEffect(() => {
    setError("");
    if (open && editId) {
      (async () => {
        try {
          const { data } = await authFetch(`${API_BASE}/careers/${editId}`);
          const it = data?.item || data;
          if (it) {
            setForm({
              title: it.title ?? "",
              category: it.category ?? "fulltime",
              status: it.status ?? "draft",
              location: it.location ?? "",
              experience: it.experience ?? "",
              salary: it.salary ?? "",
              skills: it.skills ?? "",
              apply_url: it.apply_url ?? "",
              apply_email: it.apply_email ?? "",
              description: it.description ?? "",
            });
          }
        } catch (e) { setError(e.message || "Failed to load"); }
      })();
    } else if (open) {
      setForm({
        title: "",
        category: "fulltime",
        status: "draft",
        location: "",
        experience: "",
        salary: "",
        skills: "",
        apply_url: "",
        apply_email: "",
        description: "",
      });
    }
  }, [open, editId, API_BASE]); // eslint-disable-line

  async function save() {
    setSaving(true);
    setError("");
    try {
      if (!form.title.trim()) { setError("Title is required"); return; }
      const url = editId ? `${API_BASE}/careers/${editId}` : `${API_BASE}/careers`;
      const method = editId ? "PUT" : "POST";
      const { data } = await authFetch(url, { method, body: JSON.stringify(form) });
      if (data?.error) { setError(data.error); return; }
      onSaved?.();
      onClose?.();
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally { setSaving(false); }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop career-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editId ? "Edit Job" : "Add Job"}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-content">
          <div className="grid2">
            <label>Title
              <input className="input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
            </label>

            <label>Category
              <select className="input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                <option value="fulltime">Full-time</option>
                <option value="internship">Internship</option>
              </select>
            </label>

            <label>Status
              <select className="input" value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>

            <label>Location
              <input className="input" value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} />
            </label>

            <label>Experience
              <input className="input" placeholder="e.g. 1–3 yrs" value={form.experience}
                     onChange={e=>setForm(f=>({...f,experience:e.target.value}))} />
            </label>

            <label>Salary
              <input className="input" placeholder="e.g. ₹3–5 LPA" value={form.salary}
                     onChange={e=>setForm(f=>({...f,salary:e.target.value}))} />
            </label>

            <label className="grid-span-2">Skills (comma separated)
              <input className="input" value={form.skills} onChange={e=>setForm(f=>({...f,skills:e.target.value}))} />
            </label>

            <label>Apply URL
              <input className="input" value={form.apply_url} onChange={e=>setForm(f=>({...f,apply_url:e.target.value}))} />
            </label>

            <label>Apply Email
              <input className="input" value={form.apply_email} onChange={e=>setForm(f=>({...f,apply_email:e.target.value}))} />
            </label>

            <label className="grid-span-2">Description
              <textarea className="textarea" rows={6}
                        value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} />
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn ghost" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="btn primary" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
