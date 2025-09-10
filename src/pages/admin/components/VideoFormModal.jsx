// src/pages/admin/components/VideoFormModal.jsx
import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const getToken = () => {
  try { return JSON.parse(localStorage.getItem("marche_admin_auth"))?.token || ""; }
  catch { return ""; }
};
const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const TOPS = [
  { key: "product", label: "Product" },
  { key: "surgery",  label: "Surgery" },
  { key: "training", label: "Training" },
];

// build a thumbnail from a YouTube URL
function youTubeThumb(url) {
  if (!url) return "";
  const m = String(url).match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  const id = m?.[1];
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

export default function VideoFormModal({
  open = true,
  initialTopCat = "product",
  editing = null,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    title: "",
    top_category: initialTopCat,
    sub_category_id: "",
    youtube_url: "",
    // thumbnail_url is derived; keep a field only for preview/override if needed
    thumbnail_url: "",
    status: "pending",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const isEdit = !!editing?.id;
  const [subcatOptions, setSubcatOptions] = useState([]);

  // Prefill on open / edit
  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title ?? "",
        top_category: editing.top_category ?? initialTopCat,
        sub_category_id: editing.sub_category_id ?? "",
        youtube_url: editing.youtube_url ?? "",
        thumbnail_url: editing.thumbnail_url ?? "",
        status: editing.status ?? "pending",
        description: editing.description ?? "",
      });
    } else {
      setForm((f) => ({ ...f, top_category: initialTopCat }));
    }
  }, [editing, initialTopCat]);

  // Load subcategories for currently selected top category
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${API_BASE}/video_subcategories?top_category=${encodeURIComponent(form.top_category)}`,
          { credentials: "include", headers: { ...authHeaders() } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSubcatOptions(Array.isArray(data?.items) ? data.items : []);
      } catch {
        setSubcatOptions([]);
      }
    }
    if (form.top_category) load();
  }, [form.top_category]);

  // keep a live derived thumbnail for preview when youtube_url changes
  const derivedThumb = useMemo(() => youTubeThumb(form.youtube_url), [form.youtube_url]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit() {
    if (!form.title.trim()) { alert("Title is required"); return; }
    if (!["product", "surgery", "training"].includes(form.top_category)) {
      alert("Invalid top category"); return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        top_category: form.top_category,
        sub_category_id: form.sub_category_id ? Number(form.sub_category_id) : null,
        youtube_url: form.youtube_url?.trim() || null,
        // send the derived thumbnail so admin list/public page can use it
        thumbnail_url: (form.thumbnail_url?.trim() || derivedThumb) || null,
        status: form.status || "pending",
        description: form.description || "",
      };

      const url = isEdit
        ? `${API_BASE}/videos/${editing.id}`
        : `${API_BASE}/videos`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(()=>null);
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      onSaved?.(data);
    } catch (e) {
      alert(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? `Edit Video #${editing.id}` : "Add Video"}</h3>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="flex-row" style={{ gap: 12, flexWrap: "wrap" }}>
            <label style={{flex:"1 1 320px"}}>
              <div>Title *</div>
              <input className="input" value={form.title} onChange={(e)=>update("title", e.target.value)} />
            </label>

            <label style={{width:220}}>
              <div>Top Category</div>
              <select className="input" value={form.top_category} onChange={(e)=>update("top_category", e.target.value)}>
                {TOPS.map(t=> <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </label>

            {!!subcatOptions.length && (
              <label style={{width:260}}>
                <div>Sub-category</div>
                <select
                  className="input"
                  value={form.sub_category_id ?? ""}
                  onChange={(e)=>update("sub_category_id", e.target.value)}
                >
                  <option value="">— None —</option>
                  {subcatOptions.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                </select>
              </label>
            )}

            <label style={{flex:"1 1 320px"}}>
              <div>YouTube URL</div>
              <input className="input" value={form.youtube_url} onChange={(e)=>update("youtube_url", e.target.value)} placeholder="https://youtu.be/..." />
            </label>

            <label style={{width:180}}>
              <div>Status</div>
              <select className="input" value={form.status} onChange={(e)=>update('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label style={{flex:"1 1 100%"}}>
              <div>Description</div>
              <textarea className="input" rows={3} value={form.description} onChange={(e)=>update("description", e.target.value)} />
            </label>

            {/* Live preview of derived thumb */}
            {(form.thumbnail_url || derivedThumb) ? (
              <div style={{marginTop:8}}>
                <div className="muted" style={{marginBottom:6}}>Thumbnail preview</div>
                <img
                  src={form.thumbnail_url || derivedThumb}
                  alt="thumb preview"
                  style={{ width: 260, height: "auto", borderRadius: 8 }}
                />
              </div>
            ) : null}
          </div>

          <div style={{display:"flex", justifyContent:"flex-end", gap:8, marginTop:12}}>
            <button className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={saving} onClick={submit}>
              {saving ? "Saving…" : (isEdit ? "Save Changes" : "Create")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
