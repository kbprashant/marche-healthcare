import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import "./admin.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function TestimonialRow({ row, onEdit, onDelete, onToggle }) {
  return (
    <div className="table-row">
      <div className="cell w-12">
        {row.avatar_url ? <img src={row.avatar_url} alt="" className="avatar" /> : <div className="avatar placeholder">?</div>}
      </div>
      <div className="cell grow">
        <div className="title">{row.person_name}</div>
        <div className="sub">
          {[row.person_title, row.company].filter(Boolean).join(" • ")}
          {row.rating ? ` • ★${row.rating}/5` : ""}
        </div>
        <div className="muted clamp-2">{row.message}</div>
      </div>
      <div className="cell w-20">
        <span className={`badge ${row.is_active ? "ok" : "muted"}`}>{row.is_active ? "Active" : "Hidden"}</span>
      </div>
      <div className="cell w-44 actions">
        <button onClick={()=>onToggle(row)} className="btn secondary">{row.is_active ? "Hide" : "Activate"}</button>
        <button onClick={()=>onEdit(row)} className="btn">Edit</button>
        <button onClick={()=>onDelete(row)} className="btn danger">Delete</button>
      </div>
    </div>
  );
}

function TestimonialFormModal({ open, initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    id: 0, person_name: "", person_title: "", company: "",
    rating: "", message: "", avatar_url: "", is_active: 1
  });
  useEffect(()=>{ 
    if (open) setForm({
      id: initial?.id || 0,
      person_name: initial?.person_name || "",
      person_title: initial?.person_title || "",
      company: initial?.company || "",
      rating: initial?.rating ?? "",
      message: initial?.message || "",
      avatar_url: initial?.avatar_url || "",
      is_active: initial?.is_active ?? 1
    });
  }, [open, initial]);

  async function save() {
    const payload = { ...form, rating: form.rating ? Number(form.rating) : null };
    const res = await fetch(`${API_BASE}/testimonials_save.php`, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data?.error) { alert(data.error); return; }
    onSaved();
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3>{form.id ? "Edit Testimonial" : "New Testimonial"}</h3>
          <button className="icon" onClick={onClose}>×</button>
        </div>
        <div className="modal-body grid2">
          <label>Person Name<input value={form.person_name} onChange={e=>setForm(f=>({...f, person_name:e.target.value}))} /></label>
          <label>Title/Role<input value={form.person_title} onChange={e=>setForm(f=>({...f, person_title:e.target.value}))} /></label>
          <label>Company<input value={form.company} onChange={e=>setForm(f=>({...f, company:e.target.value}))} /></label>
          <label>Rating (1–5)<input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm(f=>({...f, rating:e.target.value}))} /></label>
          <label className="colspan2">Message<textarea rows={4} value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} /></label>
          <label className="colspan2">Avatar URL<input value={form.avatar_url} onChange={e=>setForm(f=>({...f, avatar_url:e.target.value}))} placeholder="/uploads/people/jane.png" /></label>
          <label>Active?
            <select value={form.is_active} onChange={e=>setForm(f=>({...f, is_active:Number(e.target.value)}))}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>
        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsAdmin() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editRow, setEditRow] = useState(null);

  async function load(p = page) {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/testimonials_list.php`, window.location.origin);
      if (q) url.searchParams.set("q", q);
      if (status) url.searchParams.set("status", status);
      url.searchParams.set("page", String(p));
      url.searchParams.set("limit", String(limit));
      const res = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setRows(data?.items || []);
      setTotal(data?.total || 0);
      setPage(data?.page || p);
    } finally { setLoading(false); }
  }
  useEffect(()=>{ load(1); }, [q, status]);

  function openNew() { setEditRow(null); setOpenForm(true); }
  function openEdit(r) { setEditRow(r); setOpenForm(true); }

  async function deleteRow(r) {
    if (!confirm(`Delete testimonial by "${r.person_name}"?`)) return;
    const form = new FormData(); form.set('id', String(r.id));
    const res = await fetch(`${API_BASE}/testimonials_delete.php`, { method:'POST', credentials:'include', body: form });
    const data = await res.json();
    if (!data?.ok) { alert(data?.error || 'Delete failed'); return; }
    load();
  }

  async function toggleRow(r) {
    const res = await fetch(`${API_BASE}/testimonials_save.php`, {
      method: 'POST', credentials:'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id: r.id, is_active: r.is_active ? 0 : 1, person_name: r.person_name, message: r.message, person_title: r.person_title, company: r.company, rating: r.rating, avatar_url: r.avatar_url })
    });
    const data = await res.json();
    if (data?.error) { alert(data.error); return; }
    load();
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="admin-page">
      <div className="admin-header">
        <SectionHeader title="Testimonials" content="Add, edit or remove testimonials shown on the site" />
        <div className="admin-header-actions">
          <input
            className="input"
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Search name, title, company, message…"
          />
          <select className="input" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active only</option>
            <option value="inactive">Hidden</option>
          </select>
          <button className="btn" onClick={openNew}>+ New Testimonial</button>
        </div>
      </div>

      <div className="table">
        <div className="table-head">
          <div className="cell w-12">Avatar</div>
          <div className="cell grow">Person</div>
          <div className="cell w-20">Status</div>
          <div className="cell w-44">Actions</div>
        </div>
        <div className="table-body">
          {loading ? <div className="muted p-3">Loading…</div> :
            rows.length ? rows.map(r=>(
              <TestimonialRow key={r.id} row={r} onEdit={openEdit} onDelete={deleteRow} onToggle={toggleRow} />
            )) : <div className="muted p-3">No results</div>}
        </div>
      </div>

      <div className="pagination">
        <button disabled={page<=1} onClick={()=>{ setPage(p=>p-1); load(page-1); }}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page>=totalPages} onClick={()=>{ setPage(p=>p+1); load(page+1); }}>Next</button>
      </div>

      <TestimonialFormModal
        open={openForm}
        initial={editRow}
        onClose={()=>setOpenForm(false)}
        onSaved={()=>{ setOpenForm(false); load(); }}
      />
    </div>
  );
}
