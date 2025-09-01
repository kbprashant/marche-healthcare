import { useEffect, useState } from "react";
import VideoSubcatsModal from "../../components/VideoSubcatsModal";
import VideoFormModal from "./components/VideoFormModal";
import SectionHeader from "../../components/SectionHeader";
import "./admin.css";


const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const getToken = () => {
  try { return JSON.parse(localStorage.getItem("marche_admin_auth"))?.token || ""; }
  catch { return ""; }
};
const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const TOP_CATEGORIES = [
{ key: "product", label: "Product" },
{ key: "surgery", label: "Surgery" },
{ key: "training", label: "Training" },
];


export default function VideosAdmin() {
const [topCat, setTopCat] = useState("product");
const [subcats, setSubcats] = useState([]);
const [subcat, setSubcat] = useState("all");
const [query, setQuery] = useState("");
const [rows, setRows] = useState([]);
const [loading, setLoading] = useState(false);
const [showSubcatModal, setShowSubcatModal] = useState(false);
const [showForm, setShowForm] = useState(false);
const [editing, setEditing] = useState(null);


async function loadSubcats() {
  try {
   const res = await fetch(
     `${API_BASE}/video_subcategories.php?top_category=${topCat}`,
     { credentials: "include", headers: { ...authHeaders() } }
   );
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    const data = await res.json();
    setSubcats(Array.isArray(data?.items) ? data.items : []);
  } catch (e) {
    console.error("Failed to load subcategories:", e);
    setSubcats([]);
  }
}


async function loadVideos() {
  setLoading(true);
  try {
    const url = new URL(`${API_BASE}/videos_list.php`, window.location.origin);
    url.searchParams.set("top_category", topCat);
    if (subcat !== "all") url.searchParams.set("sub_category", subcat);
    if (query) url.searchParams.set("q", query);
   const res = await fetch(url, { credentials: "include", headers: { ...authHeaders() } });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    const data = await res.json();
    setRows(Array.isArray(data?.items) ? data.items : []);
  } catch (e) {
    console.error("Failed to load videos:", e);
    setRows([]);
  } finally {
    setLoading(false);
  }
}


async function remove(id){
  if (!confirm(`Delete video #${id}?`)) return;
 const res = await fetch(`${API_BASE}/video_delete.php`, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json', ...authHeaders() },
   credentials: 'include',
    body: JSON.stringify({ id })
  });
  if (!res.ok){ const t = await res.text(); alert(t || 'Delete failed'); return; }
  loadVideos();
}


useEffect(() => { loadSubcats(); }, [topCat]);
useEffect(() => { loadVideos(); }, [topCat, subcat, query]);


// global search (from topbar Ctrl/⌘+K)
useEffect(() => {
function onAdminSearch(e){ setQuery(e.detail?.q ?? ""); }
window.addEventListener('admin:search', onAdminSearch);
return () => window.removeEventListener('admin:search', onAdminSearch);
}, []);


return (
  <>
<div className="admin-page">
<div className="admin-header">
<SectionHeader title="Videos" content="Manage Product, Surgery and Training videos" />
<div className="admin-actions">
<button className="btn secondary" onClick={() => setShowSubcatModal(true)}>
  Manage {TOP_CATEGORIES.find(t=>t.key===topCat)?.label} Sub-categories
</button>
<button className="btn primary" onClick={() => { setEditing(null); setShowForm(true); }}>+ Add Video</button>
</div>
</div>


<div className="tabbar">
{TOP_CATEGORIES.map((c) => (
<button key={c.key} className={`tab ${topCat === c.key ? "active" : ""}`} onClick={() => { setTopCat(c.key); setSubcat("all"); }}>
{c.label}
</button>
))}
</div>


{!!subcats.length && (
<div className="subtabbar">
<button className={`chip ${subcat === "all" ? "active" : ""}`} onClick={() => setSubcat("all")}>All</button>
{subcats.map((sc) => (
<button key={sc.id} className={`chip ${subcat === String(sc.id) ? "active" : ""}`} onClick={() => setSubcat(String(sc.id))}>{sc.name}</button>
))}
</div>
)}


<div className="filters">
<input className="input" placeholder="Search title…" value={query} onChange={(e) => setQuery(e.target.value)} />
</div>


<div className="table">
<div className="thead">
<div>ID</div><div>Thumbnail</div><div>Title</div><div>Top Cat.</div><div>Sub-cat.</div><div>Status</div><div>Views</div><div>Actions</div>
</div>


{loading ? (
<div className="empty">Loading…</div>
) : rows.length === 0 ? (
<div className="empty">No videos found.</div>
) : (
rows.map((row) => (
<div className="trow" key={row.id}>
<div>{row.id}</div>
<div><img src={row.thumbnail_url || "/placeholder-thumb.png"} alt="thumb" className="thumb"/></div>
<div className="tcell-title">{row.title}</div>
<div className="badge">{row.top_category}</div>
<div>{row.sub_category_name || "—"}</div>
<div className={`badge ${row.status}`}>{row.status}</div>
<div>{row.views ?? 0}</div>
<div className="row-actions">
<button className="btn ghost" onClick={() => window.open(row.youtube_url || row.src_url || '#', '_blank')}>View</button>
<button className="btn ghost" onClick={() => { setEditing(row); setShowForm(true); }}>Edit</button>
<button className="btn danger" onClick={() => remove(row.id)}>Delete</button>
</div>
</div>
))
)}
</div>
</div>


 {showSubcatModal && (
   <VideoSubcatsModal
     topCat={topCat}
   onClose={() => setShowSubcatModal(false)}
    onChanged={() => { setShowSubcatModal(false); loadSubcats(); loadVideos(); }}
  />
)}


{showForm && (
<VideoFormModal
open={showForm}
initialTopCat={topCat}
subcats={subcats}
editing={editing}
onClose={() => setShowForm(false)}
onSaved={() => { setShowForm(false); loadVideos(); }}
/>
)}
</>
);
}