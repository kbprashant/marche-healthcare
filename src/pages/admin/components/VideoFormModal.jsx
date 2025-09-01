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
{ key: "surgery", label: "Surgery" },
{ key: "training", label: "Training" },
];


export default function VideoFormModal({
open = true,
initialTopCat = "product",
subcats = [],
editing = null, // pass row to edit
onClose,
onSaved,
}) {
const [form, setForm] = useState({
title: "",
top_category: initialTopCat,
sub_category_id: "",
youtube_url: "",
src_url: "",
thumbnail_url: "",
status: "pending",
description: "",
tags: "",
});
const [saving, setSaving] = useState(false);
const isEdit = !!editing?.id;
const [subcatOptions, setSubcatOptions] = useState([]);


useEffect(() => {
if (editing) {
setForm({
title: editing.title ?? "",
top_category: editing.top_category ?? initialTopCat,
sub_category_id: editing.sub_category_id ?? "",
youtube_url: editing.youtube_url ?? "",
src_url: editing.src_url ?? "",
thumbnail_url: editing.thumbnail_url ?? "",
status: editing.status ?? "pending",
description: editing.description ?? "",
tags: editing.tags ?? "",
});
} else {
setForm((f) => ({ ...f, top_category: initialTopCat }));
}
}, [editing, initialTopCat]);

  // load subcats for the currently selected top category
useEffect(() => {
  async function load() {
   const res = await fetch(`${API_BASE}/video_subcategories.php?top_category=${form.top_category}`, {
     credentials: 'include', headers: { ...authHeaders() }
   });
    if (!res.ok) { setSubcatOptions([]); return; }
    const data = await res.json();
    setSubcatOptions(Array.isArray(data?.items) ? data.items : []);
  }
  if (form.top_category) load();
}, [form.top_category]);


function update(k, v){ setForm((f)=>({ ...f, [k]: v })); }


async function submit(){
if (!form.title.trim()) { alert("Title is required"); return; }
if (!['product','surgery','training'].includes(form.top_category)) {
alert('Invalid top category'); return;
}
    if (form.top_category!== 'product' && form.top_category!== 'surgery' && form.top_category!== 'training') {
      form.sub_category_id = "";
    }

setSaving(true);
try{
const endpoint = isEdit ? `${API_BASE}/video_update.php` : `${API_BASE}/video_create.php`;
const payload = isEdit ? { id: editing.id, ...form } : form;
const res = await fetch(endpoint, {
method: 'POST',
headers: { 'Content-Type': 'application/json', ...authHeaders() },
credentials: 'include',
body: JSON.stringify(payload)
});
const data = await res.json();
if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
onSaved?.(data);
} catch (e){
alert(e.message || 'Save failed');
} finally { setSaving(false); }
}


if (!open) return null;


return (
    <div className="modal-backdrop" onClick={onClose}>
<div className="modal" onClick={(e)=>e.stopPropagation()}>
<div className="modal-header">
<h3>{isEdit ? `Edit Video #${editing.id}` : 'Add Video'}</h3>
<button className="icon-btn" onClick={onClose}>✕</button>
</div>
<div className="modal-body">
<div className="flex-row" style={{ gap: 12, flexWrap: 'wrap' }}>
<label style={{flex:'1 1 320px'}}>
<div>Title *</div>
<input className="input" value={form.title} onChange={(e)=>update('title', e.target.value)} />
</label>
<label style={{width:220}}>
<div>Top Category</div>
<select className="input" value={form.top_category} onChange={(e)=>update('top_category', e.target.value)}>
{TOPS.map(t=> <option key={t.key} value={t.key}>{t.label}</option>)}
</select>
</label>
{subcatOptions.length > 0 && (
<label style={{width:260}}>
<div>Sub-category</div>
<select className="input" value={form.sub_category_id ?? ''} onChange={(e)=>update('sub_category_id', e.target.value)}>
<option value="">— None —</option>
{subcatOptions.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
</select>
</label>
)}
<label style={{flex:'1 1 320px'}}>
<div>YouTube URL</div>
<input className="input" value={form.youtube_url} onChange={(e)=>update('youtube_url', e.target.value)} placeholder="https://youtu.be/..." />
</label>
<label style={{flex:'1 1 320px'}}>
<div>Thumbnail URL</div>
<input className="input" value={form.thumbnail_url} onChange={(e)=>update('thumbnail_url', e.target.value)} placeholder="https://.../thumb.jpg" />
</label>
<label style={{width:180}}>
<div>Status</div>
<select className="input" value={form.status} onChange={(e)=>update('status', e.target.value)}>
<option value="draft">Draft</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
</select>
</label>
<label style={{flex:'1 1 100%'}}>
<div>Description</div>
<textarea className="input" rows={3} value={form.description} onChange={(e)=>update('description', e.target.value)} />
</label>
<label style={{flex:'1 1 100%'}}>
<div>Tags (comma separated)</div>
<input className="input" value={form.tags} onChange={(e)=>update('tags', e.target.value)} placeholder="training,intro,..." />
</label>
</div>
<div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:12}}>
<button className="btn ghost" onClick={onClose}>Cancel</button>
<button className="btn primary" disabled={saving} onClick={submit}>{saving? 'Saving…' : (isEdit? 'Save Changes':'Create')}</button>
</div>
</div>
</div>
</div>
);
}