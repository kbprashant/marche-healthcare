import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const getToken = () => {
  try { return JSON.parse(localStorage.getItem("marche_admin_auth"))?.token || ""; }
  catch { return ""; }
};
const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export default function VideoSubcatsModal({ topCat = "product", onClose, onChanged }) {
const [name, setName] = useState("");
const [items, setItems] = useState([]);


async function refresh(){
 const res = await fetch(`${API_BASE}/video_subcategories.php?top_category=${topCat}`, {
   credentials: 'include', headers: { ...authHeaders() }
 });
  const data = await res.json();
  setItems(data?.items || []);
}


// initial load
useEffect(()=>{ refresh(); }, [topCat]);


async function add(){
  if (!name.trim()) return;
  await fetch(`${API_BASE}/video_subcategories_add.php`, {
   method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
    body: JSON.stringify({ top_category: topCat, name })
  });
  setName("");
  refresh();
  onChanged?.();
}
async function rename(id, newName){
  if (!newName.trim()) return;
  await fetch(`${API_BASE}/video_subcategories_update.php`, {
   method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
    body: JSON.stringify({ id, name: newName })
  });
  refresh();
  onChanged?.();
}
async function archive(id){
  if (!confirm('Archive this sub-category?')) return;
  await fetch(`${API_BASE}/video_subcategories_archive.php`, {
   method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() }, credentials: 'include',
    body: JSON.stringify({ id })
  });
  refresh();
  onChanged?.();
}


return (
<div className="modal-backdrop" onClick={onClose}>
<div className="modal" onClick={(e)=>e.stopPropagation()}>
<div className="modal-header">
<h3>Manage {topCat[0].toUpperCase()+topCat.slice(1)} Sub-categories</h3>
<button className="icon-btn" onClick={onClose}>✕</button>
</div>
<div className="modal-body">
<div className="flex-row" style={{gap:8}}>
<input className="input" placeholder="New sub‑category" value={name} onChange={(e)=>setName(e.target.value)} />
<button className="btn primary" onClick={add}>Add</button>
</div>
<ul className="subcat-list" style={{marginTop:8}}>
{items.map(sc => (
<li key={sc.id} className="subcat-item">
<input className="input" defaultValue={sc.name} onBlur={(e)=>rename(sc.id, e.target.value)} />
<button className="btn danger" onClick={()=>archive(sc.id)}>Archive</button>
</li>
))}
</ul>
</div>
</div>
</div>
);
}