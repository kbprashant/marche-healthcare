import { useEffect, useState } from "react";

export default function CareerFormModal({ open, onClose, API_BASE, editId, onSaved }) {
  const [form, setForm] = useState({
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (open && editId) {
      (async () => {
        const url = new URL(`${API_BASE}/careers_get.php`, window.location.origin);
        url.searchParams.set("id", editId);
        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();
        if (data?.item) {
          setForm({
            title: data.item.title ?? "",
            category: data.item.category ?? "fulltime",
            status: data.item.status ?? "draft",
            location: data.item.location ?? "",
            experience: data.item.experience ?? "",
            salary: data.item.salary ?? "",
            skills: data.item.skills ?? "",
            apply_url: data.item.apply_url ?? "",
            apply_email: data.item.apply_email ?? "",
            description: data.item.description ?? "",
          });
        }
      })();
    } else if (open && !editId) {
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
  }, [open, editId, API_BASE]);

  async function save() {
    setSaving(true);
    setError("");
    try {
      if (!form.title.trim()) { setError("Title is required"); return; }
      const res = await fetch(`${API_BASE}/careers_save.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: editId || undefined, ...form }),
      });
      const data = await res.json();
      if (data?.error) { setError(data.error); return; }
      onSaved?.();
      onClose?.();
    } catch(e) {
      setError("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-header">
          <h3>{editId ? "Edit Job" : "Add Job"}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body grid2">
          <label>Title<input className="input" value={form.title}
            onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></label>

          <label>Category
            <select className="input" value={form.category}
              onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
            </select>
          </label>

          <label>Status
            <select className="input" value={form.status}
              onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <label>Location<input className="input" value={form.location}
            onChange={e=>setForm(f=>({...f,location:e.target.value}))}/></label>

          <label>Experience<input className="input" placeholder="e.g. 1–3 yrs"
            value={form.experience} onChange={e=>setForm(f=>({...f,experience:e.target.value}))}/></label>

          <label>Salary<input className="input" placeholder="e.g. ₹3–5 LPA"
            value={form.salary} onChange={e=>setForm(f=>({...f,salary:e.target.value}))}/></label>

          <label className="grid-span-2">Skills (comma separated)
            <input className="input" value={form.skills}
              onChange={e=>setForm(f=>({...f,skills:e.target.value}))}/>
          </label>

          <label>Apply URL<input className="input" value={form.apply_url}
            onChange={e=>setForm(f=>({...f,apply_url:e.target.value}))}/></label>

          <label>Apply Email<input className="input" value={form.apply_email}
            onChange={e=>setForm(f=>({...f,apply_email:e.target.value}))}/></label>

          <label className="grid-span-2">Description
            <textarea className="textarea" rows={6} value={form.description}
              onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
          </label>
        </div>

        {error && <div className="form-error">{error}</div>}

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
