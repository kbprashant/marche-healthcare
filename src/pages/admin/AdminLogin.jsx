import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "../css/admin-login.css";

// set in .env → VITE_API_BASE_URL=http://localhost:8080/api/admin
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/admin";

export default function AdminLogin() {
  const nav = useNavigate();
  const location = useLocation();
  const { login, loading, setLoading, isAuthed, booting } = useAuth();
  const from = useMemo(() => location.state?.from?.pathname || "/admin", [location]);

  useEffect(() => { if (!booting && isAuthed) nav(from, { replace: true }); }, [booting, isAuthed, from, nav]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.token) {
        const msg = data?.error || `HTTP ${res.status}`;
        throw new Error(msg === "Invalid email or password" ? msg : "Login failed");
      }
      login({ token: data.token, admin: data.admin || { email: form.email } });
      nav(from, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <img src="/companyLogo.png" alt="Marche Healthcare" />
          <h1>Admin Login</h1>
          <p>Welcome back. Please sign in to continue.</p>
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <form onSubmit={onSubmit} className="auth-form" noValidate>
          <label className="auth-label">Email</label>
          <input className="auth-input" type="email" name="email"
            placeholder="you@company.com" value={form.email}
            onChange={onChange} autoComplete="email" required />

          <label className="auth-label">Password</label>
          <div className="auth-input-group">
            <input className="auth-input" type={showPwd ? "text" : "password"}
              name="password" placeholder="••••••••"
              value={form.password} onChange={onChange}
              autoComplete="current-password" required minLength={6}/>
            <button type="button" className="ghost-btn" onClick={() => setShowPwd(s => !s)}>
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <button className="auth-submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/" className="auth-link">← Back to site</Link>
        </div>
      </div>

      <video className="auth-bg" autoPlay muted loop playsInline>
        <source src="/home/background-video.mp4" type="video/mp4" />
      </video>
      <div className="auth-overlay" />
    </div>
  );
}
