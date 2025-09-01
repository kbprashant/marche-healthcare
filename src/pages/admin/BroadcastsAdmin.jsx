import { useEffect, useMemo, useState } from "react";
import PreviewModal from "./components/PreviewModal";
import BroadcastFormModal from "./components/BroadcastFormModal";
import SectionHeader from "../../components/SectionHeader";
import "./admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export default function BroadcastsAdmin() {
  const [tab, setTab] = useState("social"); // 'social' | 'news'
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // row or null
  const [preview, setPreview] = useState(null); // row or null

  async function load() {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/broadcasts_list.php`, window.location.origin);
      url.searchParams.set("category", tab);
      if (query) url.searchParams.set("q", query);
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setRows(data?.items || []);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, [tab, query]);

  const openNew = () => { setEditing(null); setShowForm(true); };
  const openEdit = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/broadcasts_get.php?id=${id}`, { credentials:"include" });
      const data = await res.json();
      if (data?.ok) {
        setEditing(data.item);
        setShowForm(true);
      }
    } catch (e) { console.error(e); }
  };
  const doDelete = async (id) => {
    if (!confirm("Delete broadcast? This cannot be undone.")) return;
    try {
      const res = await fetch(`${API_BASE}/broadcasts_delete.php?id=${id}`, {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (data?.ok) setRows(rows => rows.filter(r => r.id !== id));
      else alert(data?.error || "Delete failed");
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <SectionHeader title="Broadcasts" content="Social Media vs News & Events" />
        <div className="admin-actions">
          <button className="btn primary" onClick={openNew}>+ New Broadcast</button>
        </div>
      </div>

      <div className="tabbar">
        <button className={`tab ${tab==="social"?"active":""}`} onClick={()=>setTab("social")}>Social Media</button>
        <button className={`tab ${tab==="news"?"active":""}`} onClick={()=>setTab("news")}>News & Events</button>
      </div>

      <div className="filters">
        <input className="input" placeholder="Search title…" value={query} onChange={(e)=>setQuery(e.target.value)} />
      </div>

      <div className="table">
        <div className="thead">
          <div>ID</div><div>Title</div><div>Category</div><div>Status</div><div>Schedule</div><div>Actions</div>
        </div>

        {loading ? (
          <div className="empty">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="empty">No broadcasts yet.</div>
        ) : rows.map(r => (
          <div className="trow" key={r.id}>
            <div>{r.id}</div>
            <div className="tcell-title">{r.title}</div>
            <div className="badge">{r.category}</div>
            <div className={`badge ${r.status}`}>{r.status}</div>
            <div>{r.scheduled_at || "—"}</div>
            <div className="row-actions">
              <button className="btn ghost" onClick={()=>setPreview(r)}>Preview</button>
              <button className="btn ghost" onClick={()=>openEdit(r.id)}>Edit</button>
              <button className="btn danger" onClick={()=>doDelete(r.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <BroadcastFormModal
          initial={editing ? editing : { category: tab, status: "draft" }}
          onClose={()=>setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {preview && <PreviewModal id={preview.id} onClose={()=>setPreview(null)} />}
    </div>
  );
}