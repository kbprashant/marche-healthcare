import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import CareerFormModal from "./components/CareerFormModal";
import "./admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function CareersAdmin(){
  const [category, setCategory] = useState("fulltime"); // fulltime | parttime
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  async function load(){
    setLoading(true);
    try{
      const url = new URL(`${API_BASE}/careers_list.php`, window.location.origin);
      url.searchParams.set("category", category);
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setRows(data?.items || []);
    } finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); }, [category, query]);

  function openAdd() { setEditId(null); setShowForm(true); }
  function openEdit(id) { setEditId(id); setShowForm(true); }
  function onSaved() { load(); }

  async function onDelete(id){
    if (!confirm("Delete this job?")) return;
    const res = await fetch(`${API_BASE}/careers_delete.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data?.ok) load();
    else alert(data?.error || "Delete failed");
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <SectionHeader title="Careers" content="Add, edit or remove Full-time and Part-time roles" />
        <div className="admin-actions">
          <button className="btn primary" onClick={openAdd}>+ Add Job</button>
        </div>
      </div>

      <div className="tabbar">
        <button className={`tab ${category==="fulltime"?"active":""}`} onClick={()=>setCategory("fulltime")}>Full-time</button>
        <button className={`tab ${category==="parttime"?"active":""}`} onClick={()=>setCategory("parttime")}>Part-time</button>
      </div>

      <div className="filters">
        <input className="input" placeholder="Search title…" value={query} onChange={(e)=>setQuery(e.target.value)} />
      </div>

      <div className="table">
        <div className="thead">
          <div>ID</div><div>Title</div><div>Category</div><div>Status</div><div>Updated</div><div>Actions</div>
        </div>
        {loading ? (
          <div className="empty">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="empty">No jobs found.</div>
        ) : rows.map(r => (
          <div className="trow" key={r.id}>
            <div>{r.id}</div>
            <div className="tcell-title">{r.title}</div>
            <div className="badge">{r.category}</div>
            <div className={`badge ${r.status}`}>{r.status}</div>
            <div>{new Date(r.updated_at).toLocaleString()}</div>
            <div className="row-actions">
              <button className="btn ghost" onClick={()=>openEdit(r.id)}>Edit</button>
              <button className="btn danger" onClick={()=>onDelete(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <CareerFormModal
        open={showForm}
        onClose={()=>setShowForm(false)}
        API_BASE={API_BASE}
        editId={editId}
        onSaved={onSaved}
      />
    </div>
  );
}
