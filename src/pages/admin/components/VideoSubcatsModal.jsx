// src/components/VideoSubcatsModal.jsx
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/admin";
const getToken = () => {
  try { return JSON.parse(localStorage.getItem("marche_admin_auth"))?.token || ""; }
  catch { return ""; }
};
const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export default function VideoSubcatsModal({ topCat, onClose, onChanged }) {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/video_subcategories?top_category=${encodeURIComponent(topCat)}`,
        { credentials: "include", headers: { ...authHeaders() } }
      );
      const data = await res.json();
      setItems(Array.isArray(data?.items) ? data.items : []);
    } finally { setLoading(false); }
  }

  async function add() {
    const name = newName.trim();
    if (!name) return;
    const res = await fetch(`${API_BASE}/video_subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      credentials: "include",
      body: JSON.stringify({ top_category: topCat, name })
    });
    if (!res.ok) { alert("Add failed"); return; }
    setNewName("");
    await load();
    onChanged?.();
  }

  async function rename(id, name) {
    const v = prompt("Rename sub-category:", name);
    if (!v || v.trim() === name) return;
    const res = await fetch(`${API_BASE}/video_subcategories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      credentials: "include",
      body: JSON.stringify({ name: v.trim() })
    });
    if (!res.ok) { alert("Rename failed"); return; }
    await load();
    onChanged?.();
  }

  async function remove(id) {
    if (!confirm("Delete this sub-category?")) return;
    const res = await fetch(`${API_BASE}/video_subcategories/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
      credentials: "include"
    });
    if (!res.ok && res.status !== 204) { alert("Delete failed"); return; }
    await load();
    onChanged?.();
  }

  useEffect(() => { load(); }, [topCat]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3>Manage {topCat[0].toUpperCase()+topCat.slice(1)} Sub-categories</h3>
          <button className="icon" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div style={{ display:"flex", gap:8, marginBottom:12 }}>
            <input
              className="input"
              placeholder="New sub-category"
              value={newName}
              onChange={(e)=>setNewName(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter" && add()}
              style={{ flex:1 }}
            />
            <button className="btn primary" onClick={add}>Add</button>
          </div>

          {loading ? (
            <div className="empty">Loading…</div>
          ) : items.length === 0 ? (
            <div className="empty">No sub-categories yet.</div>
          ) : (
            <div className="table">
              {items.map(i => (
                <div className="trow" key={i.id}>
                  <div className="tcell-title">{i.name}</div>
                  <div className="row-actions">
                    <button className="btn ghost" onClick={()=>rename(i.id, i.name)}>Rename</button>
                    <button className="btn danger" onClick={()=>remove(i.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
