// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/admin";
const LS_KEY = "marche_admin_auth";
const VERIFY_ON_BOOT = import.meta.env.VITE_VERIFY_ADMIN_ON_BOOT === "true"; // optional

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch { return null; }
  });
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!admin?.token) { setBooting(false); return; }
      if (!VERIFY_ON_BOOT) { setBooting(false); return; }

      try {
        const res = await fetch(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
        if (res.status === 401 || res.status === 403) throw new Error("unauthorized");
        const data = await res.json();
        if (data?.ok && data.admin) {
          setAdmin(a => ({ ...a, ...data.admin }));
        }
      } catch (e) {
        if (!cancelled && String(e.message).includes("unauthorized")) {
          setAdmin(null);
          localStorage.removeItem(LS_KEY);
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();
    return () => { cancelled = true; };
  }, [admin?.token]);

  function login(payload) {
    setAdmin(payload);
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  }

  async function logout() {
    try {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${admin?.token || ""}` },
      });
    } catch {}
    setAdmin(null);
    localStorage.removeItem(LS_KEY);
  }

  return (
    <AuthContext.Provider value={{
      admin,
      token: admin?.token,
      isAuthed: !!admin?.token,
      login,
      logout,
      booting,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
