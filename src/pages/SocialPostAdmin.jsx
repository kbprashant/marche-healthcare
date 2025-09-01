import React, { useMemo, useState } from 'react';
// import { useLocation } from "react-router-dom"; // not used
// import { motion } from "framer-motion"; // not used

import { Layouts } from "../Layouts/Layouts";
import "./css/aboutpage.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost/api';

export default function SocialPostAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('linkedin');
  const [postUrl, setPostUrl] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const preview = useMemo(() => (image ? URL.createObjectURL(image) : ''), [image]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    if (!title || !description || !image) {
      setMsg('Please fill title, description and select an image.');
      return;
    }
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('platform', platform);
    if (postUrl) fd.append('post_url', postUrl);
    fd.append('image', image);

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/create_post.php`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || 'UPLOAD_FAILED');
      setMsg('✅ Post saved successfully!');
      setTitle('');
      setDescription('');
      setPlatform('linkedin');
      setPostUrl('');
      setImage(null);
    } catch (err) {
      setMsg('❌ ' + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layouts title="Social Post Admin">
      <div className="container" style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
        <br/><br/>
        <h1 style={{ marginBottom: 12 }}>Add Social Post</h1>
        <p style={{ color: '#666', marginBottom: 24 }}>
          Enter your LinkedIn (or other) post details. This will save to your MySQL database and appear on your website automatically.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="label">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post title" />

          <label className="label">Description</label>
          <textarea className="textarea" rows={5} value={description} onChange={e=>setDescription(e.target.value)} placeholder="Short description" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="label">Platform</label>
              <select className="input" value={platform} onChange={e=>setPlatform(e.target.value)}>
                <option value="linkedin">LinkedIn</option>
                <option value="x">X (Twitter)</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Post URL (optional)</label>
              <input className="input" value={postUrl} onChange={e=>setPostUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <label className="label" style={{ marginTop: 12 }}>Image</label>
          <input className="input" type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} />
          {preview && (
            <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 280, objectFit: 'cover', marginTop: 8, borderRadius: 8 }} />
          )}

          <button className="button" type="submit" disabled={submitting} style={{ marginTop: 16 }}>
            {submitting ? 'Saving…' : 'Save Post'}
          </button>
        </form>

        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

        <style>{`
          .label{display:block;font-weight:600;margin:8px 0 6px}
          .input, .textarea, select{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:8px}
          .button{padding:10px 14px;border:none;border-radius:10px;background:#111;color:#fff;cursor:pointer}
          .button:disabled{opacity:.6;cursor:not-allowed}
        `}</style>
      </div>
    </Layouts>
  );
}
