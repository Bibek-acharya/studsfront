import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

const SuperAdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, logout, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin" || user?.role === "super_admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      const isAdmin = loggedInUser.role === "admin" || loggedInUser.role === "super_admin";

      if (!isAdmin) {
        logout();
        setError("This page is only for super admin or admin accounts.");
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#020617_55%)]" />
      <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
          <div className="mb-7">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold">StudSphere Control</p>
            <h1 className="text-3xl font-black mt-2">Super Admin Login</h1>
            <p className="text-sm text-slate-300 mt-2">Sign in from localhost using your admin credentials.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="admin@studsphere.com"
                className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter secure password"
                className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-400 text-slate-950 font-black py-3 mt-2 transition hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Access Admin Panel"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLoginPage;
