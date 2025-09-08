// src/pages/admin/CareersAdmin.jsx
import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import CareerFormModal from "./components/CareerFormModal";
import { useAuth } from "../../auth/AuthContext";            // ✅ same as Broadcasts
import "./admin-css/admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/admin";

export default function CareersAdmin() {
  const { token } = useAuth();                               // ✅ same as Broadcasts
  const [category, setCategory] = useState("fulltime");
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  async function authFetch(url, init = {}) {
    const headers = { ...(init.headers || {}), Authorization: `Bearer ${token}` };
    if (!(init.body instanceof FormData)) headers["Content-Type"] = "application/json";
    const res = await fetch(url, { ...init, headers });      // ✅ no credentials, Bearer only
    const text = await res.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch {}
    if (!res.ok) throw new Error((data && data.error) || `HTTP ${res.status}`);
    return { data, status: res.status };
  }

  async function load() {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/careers`, window.location.origin);
      url.searchParams.set("category", category);
      if (query) url.searchParams.set("q", query);
      const { data } = await authFetch(url.toString());
      setRows(data?.items || data || []);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [category, query]);

  const openAdd  = () => { setEditId(null); setShowForm(true); };
  const openEdit = (id) => { setEditId(id); setShowForm(true); };

  async function onDelete(id) {
    if (!confirm("Delete this job?")) return;
    try {
      await authFetch(`${API_BASE}/careers/${id}`, { method: "DELETE" });
      load();
    } catch (e) { alert(e.message || "Delete failed"); }
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <SectionHeader title="Careers" content="Add, edit or remove Full-time / Internship roles" />
        <div className="admin-actions">
          <button className="btn primary" onClick={openAdd}>+ Add Job</button>
        </div>
      </div>

      <div className="tabbar">
        <button className={`tab ${category==="fulltime"?"active":""}`} onClick={()=>setCategory("fulltime")}>Full-time</button>
        <button className={`tab ${category==="internship"?"active":""}`} onClick={()=>setCategory("internship")}>Internship</button>
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

      {showForm && (
        <CareerFormModal
          open={showForm}
          onClose={()=>setShowForm(false)}
          API_BASE={API_BASE}
          editId={editId}
          onSaved={load}
          token={token}                                  // ✅ pass token exactly like Broadcasts
        />
      )}
    </div>
  );
}
