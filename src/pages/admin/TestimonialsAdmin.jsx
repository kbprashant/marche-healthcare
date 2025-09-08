// src/pages/admin/TestimonialsAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { useAuth } from "../../auth/AuthContext";
import "./admin-css/admin.css";
import "./admin-css/modals/base.css";
import "./admin-css/modals/testimonial.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/admin";
const API_ORIGIN = new URL(API_BASE).origin;
const toAbsoluteUrl = (p) => { try { return new URL(p).href; } catch { return p ? `${API_ORIGIN}${p.startsWith('/') ? p : `/${p}`}` : ''; } };


 function TestimonialRow({ row, onEdit, onDelete, onToggle }) {
   return (
     <div className="trow">
      <div className="cell w-12">
       {row.image ? <img src={toAbsoluteUrl(row.image)} alt="" className="avatar" /> : <div className="avatar placeholder">?</div>}
      </div>
      <div className="cell grow">
        <div className="title">{row.person_name}</div>
        <div className="sub">
          {[row.person_title, row.company].filter(Boolean).join(" • ")}
        </div>
        <div className="muted clamp-2">{row.message}</div>
      </div>
      <div className="cell w-20">
        <span className={`badge ${row.is_active ? "ok" : "muted"}`}>{row.is_active ? "Active" : "Hidden"}</span>
      </div>
      <div className="cell w-44 row-actions">
        <button onClick={()=>onToggle(row)} className="btn secondary">{row.is_active ? "Hide" : "Activate"}</button>
        <button onClick={()=>onEdit(row)} className="btn">Edit</button>
        <button onClick={()=>onDelete(row)} className="btn danger">Delete</button>
      </div>
    </div>
  );
}

function TestimonialFormModal({ open, initial, onClose, onSaved, authFetch }) {
  const [form, setForm] = useState({
    id: 0, person_name: "", person_title: "", company: "",
    message: "", is_active: 1, imageFile: null, imagePreview: ""
  });

  useEffect(()=>{ 
    if (open) setForm({
      id: initial?.id || 0,
      person_name: initial?.person_name || "",
      person_title: initial?.person_title || "",
      company: initial?.company || "",
      message: initial?.message || "",
      is_active: initial?.is_active ? 1 : 0,
      imageFile: null,
      imagePreview: initial?.image || ""
    });
  }, [open, initial]);

  function onPickFile(e) {
    const f = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, imageFile: f, imagePreview: f ? URL.createObjectURL(f) : prev.imagePreview }));
  }

  async function save() {
    const fd = new FormData();
    if (form.id) {
      // update
      fd.set("person_name", form.person_name);
      fd.set("person_title", form.person_title);
      fd.set("company", form.company);
      fd.set("message", form.message);
      fd.set("is_active", String(form.is_active));
      if (form.imageFile) fd.set("image", form.imageFile);
      const res = await authFetch(`${API_BASE}/testimonials/${form.id}`, { method: "PUT", body: fd, isMultipart: true });
      if (res?.error) { alert(res.error); return; }
      onSaved();
    } else {
      // create
      if (!form.imageFile) { 
        if (!confirm("No image selected. Continue without an image?")) return; 
      }
      fd.set("person_name", form.person_name);
      fd.set("person_title", form.person_title);
      fd.set("company", form.company);
      fd.set("message", form.message);
      fd.set("is_active", String(form.is_active));
      if (form.imageFile) fd.set("image", form.imageFile);
      const res = await authFetch(`${API_BASE}/testimonials`, { method: "POST", body: fd, isMultipart: true });
      if (res?.error) { alert(res.error); return; }
      onSaved();
    }
  }

  if (!open) return null;
  return (
    <div className="modal-backdrop testimonial-modal" onClick={onClose}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <div className="modal-header">
          <h3>{form.id ? "Edit Testimonial" : "New Testimonial"}</h3>
          <button className="icon" onClick={onClose}>×</button>
        </div>
        <div className="modal-content grid2">
          <label>Person Name<input value={form.person_name} onChange={e=>setForm(f=>({...f, person_name:e.target.value}))} /></label>
          <label>Title/Role<input value={form.person_title} onChange={e=>setForm(f=>({...f, person_title:e.target.value}))} /></label>
          <label>Company<input value={form.company} onChange={e=>setForm(f=>({...f, company:e.target.value}))} /></label>
          <label className="grid-span-2">Message<textarea rows={4} value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} /></label>
          <label>Active?
            <select value={form.is_active} onChange={e=>setForm(f=>({...f, is_active:Number(e.target.value)}))}>
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
          <label className="grid-span-2">Image
            <input type="file" accept="image/*" onChange={onPickFile} />
          </label>
          {form.imagePreview ? <img className="image-preview" src={form.imagePreview} alt="" style={{maxWidth:180, borderRadius:12}}/> : null}
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
  const { token } = useAuth();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const authFetch = useMemo(()=>async (url, init={})=>{
    const headers = new Headers(init.headers || {});
     if (!init.isMultipart && init.body && !(init.body instanceof FormData)) {
       headers.set('Content-Type', 'application/json');
     }
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const res = await fetch(url, { ...init, headers, credentials: 'include' });
      // Gracefully handle 204 / non-JSON
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const data = await res.json().catch(()=>null);
        // normalize shape so callers can rely on .ok
        return { ok: res.ok, status: res.status, ...data };
      }
      // No JSON body → still report HTTP ok
      return { ok: res.ok, status: res.status };
  }, [token]);

  async function load(p = page) {
    setLoading(true);
    try {
      const u = new URL(`${API_BASE}/testimonials`, window.location.origin);
      if (q) u.searchParams.set("q", q);
      if (status) u.searchParams.set("status", status);
      u.searchParams.set("page", String(p));
      u.searchParams.set("limit", String(limit));
      const data = await authFetch(u.toString());
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
    const data = await authFetch(`${API_BASE}/testimonials/${r.id}`, { method: 'DELETE' });
    if (!data || data.ok === false) { alert(data?.error || 'Delete failed'); return; }
    load();
  }

  async function toggleRow(r) {
    const data = await authFetch(`${API_BASE}/testimonials/${r.id}/active`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: !r.is_active })
    });
    if (!data || data.ok === false) { alert(data?.error || 'Update failed'); return; }
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

       <div className="table testimonials-table">
       <div className="thead">
         <div className="cell w-12">Image</div>
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
        authFetch={authFetch}
      />
    </div>
  );
}
