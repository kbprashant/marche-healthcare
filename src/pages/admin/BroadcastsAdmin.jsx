import { useEffect, useState } from "react";
import PreviewModal from "./components/PreviewModal";
import BroadcastFormModal from "./components/BroadcastFormModal";
import SectionHeader from "../../components/SectionHeader";
import { useAuth } from "../../auth/AuthContext";
import "./admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/admin";

export default function BroadcastsAdmin() {
  const { token } = useAuth();
  const [tab, setTab] = useState("social"); // -> maps to backend "kind"
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  async function authFetch(url, init = {}) {
    const hdrs = { ...(init.headers || {}), Authorization: `Bearer ${token}` };
    // Only set JSON header when NOT sending FormData
    if (!(init.body instanceof FormData)) hdrs["Content-Type"] = "application/json";

    const res = await fetch(url, { ...init, headers: hdrs });
    const text = await res.text();
    let data = null; try { data = text ? JSON.parse(text) : null; } catch {}
    if (!res.ok) throw new Error((data && data.error) || `HTTP ${res.status}`);
    return { data, status: res.status };
  }

  async function load() {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/broadcasts`, window.location.origin);
      url.searchParams.set("kind", tab);      // backend expects ?kind=
      if (query) url.searchParams.set("q", query);
      const { data } = await authFetch(url.toString());
      // backend returns an array of rows
      setRows(Array.isArray(data) ? data : (data?.items || data?.rows || []));
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tab, query]);

  const openNew = () => { setEditing(null); setShowForm(true); };

  const openEdit = async (id) => {
    try {
      const { data } = await authFetch(`${API_BASE}/broadcasts/${id}`);
      if (data) { setEditing(data); setShowForm(true); }
    } catch (e) { console.error(e); }
  };

  const doDelete = async (id) => {
    if (!confirm("Delete broadcast? This cannot be undone.")) return;
    try {
      const { status } = await authFetch(`${API_BASE}/broadcasts/${id}`, { method: "DELETE" });
      if (status === 204) setRows((rows) => rows.filter((r) => r.id !== id));
    } catch (e) {
      console.error(e);
      alert(e.message || "Delete failed");
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
            <div className="tcell-title">
              {r.title}
              { (r.kind ?? r.category) === 'social' && r.social_source && (
                <span className="badge" style={{ marginLeft: 8 }}>{r.social_source}</span>
              )}
            </div>
            <div className="badge">{r.kind ?? r.category}</div>
            <div className={`badge ${r.status}`}>{r.status}</div>
            <div>{r.publish_at ? new Date(r.publish_at).toLocaleString() : "—"}</div>
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
          apiBase={API_BASE}
          token={token}
          initial={editing ? editing : { kind: tab, status: "draft" }}
          onClose={()=>setShowForm(false)}
          onSaved={() => { setShowForm(false); load(); }}
        />
      )}

      {preview && (
        <PreviewModal
          id={preview.id}
          apiBase={API_BASE}
          token={token}
          onClose={()=>setPreview(null)}
        />
      )}
    </div>
  );
}
