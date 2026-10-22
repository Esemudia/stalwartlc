import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { saveSession, portalForRole, type UserRole } from "../../auth";
import { login } from "../../api";
import logo from "../../assets/logo.png";

interface LocationState {
  from?: string;
}

const ROLES: {
  key: UserRole;
  label: string;
  desc: string;
  portalPath: string;
}[] = [
    {
      key: "client",
      label: "Client",
      desc: "View your cases, documents, messages & invoices",
      portalPath: "/portal/client",
    },
    {
      key: "lawyer",
      label: "Lawyer",
      desc: "Full case management, clients, billing & staff directory",
      portalPath: "/portal/lawyer",
    },
    {
      key: "front_desk",
      label: "Front Desk",
      desc: "Register clients and file cases",
      portalPath: "/portal/staff",
    },
    {
      key: "exec_secretary",
      label: "Exec. Secretary",
      desc: "Case filing and client coordination",
      portalPath: "/portal/staff",
    },
    {
      key: "super_admin",
      label: "Super Admin",
      desc: "Full system access & staff management",
      portalPath: "/portal/admin",
    },
  ];

// Demo credentials for each role (bypass in development)
const DEMO_CREDENTIALS: Record<UserRole, { email: string; name: string }> = {
  client: { email: "e.okafor@company.com", name: "Emmanuel Okafor" },
  lawyer: { email: "c.stalwart@stalwartlc.com", name: "Chukwuemeka Stalwart" },
  front_desk: { email: "e.obi@stalwartlc.com", name: "Emeka Obi" },
  exec_secretary: { email: "n.amadi@stalwartlc.com", name: "Ngozi Amadi" },
  super_admin: { email: "admin@stalwartlc.com", name: "Administrator" },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [role, setRole] = useState<UserRole>("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selected = ROLES.find((r) => r.key === role)!;
  const demo = DEMO_CREDENTIALS[role];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Hard hitting the live API!
      const res = await login({ email: email.trim(), password });

      // We store the session (including the signed JWT returned)
      saveSession({
        role: res.user.role,
        name: res.user.name,
        email: res.user.email,
        token: res.access_token // Requires auth.ts update to handle token
      } as any);

      const destination = state?.from ?? portalForRole(res.user.role);
      navigate(destination, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* ── Left panel ────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 p-12 relative overflow-hidden"
        style={{ background: "var(--primary)", borderRight: "1px solid var(--border)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1775144657566-e5b093073baf?w=800&h=1200&fit=crop&auto=format"
          alt="Law office"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />

        {/* Back link */}
        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            ← Back to site
          </Link>
        </div>

        {/* Branding + role list */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img
              src={logo}
              alt="Stalwart Law Consult"
              className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(213,170,109,0.3)]"
            />
            <div className="border-l border-white/20 pl-3">
              <span className="block font-serif text-lg font-bold tracking-wide text-white">
                STALWART
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#D5AA6D] font-medium">
                Law Consult • Access Portal
              </span>
            </div>
          </div>

          <h2
            className="font-serif text-4xl font-semibold leading-tight mb-4"
            style={{ color: "white" }}
          >
            Secure.<br />
            <em style={{ color: "var(--accent)" }}>Centralised.</em><br />
            Transparent.
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
            Each role has its own dedicated portal with precisely the access it
            needs — no more, no less.
          </p>

          {/* Role badges */}
          <div className="space-y-2">
            {ROLES.map((r) => (
              <div
                key={r.key}
                className="flex items-start gap-3 px-3 py-2.5 transition-colors"
                style={{
                  background: r.key === role ? "rgba(255,255,255,0.1)" : "transparent",
                  borderLeft: r.key === role ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <div>
                  <div
                    className="text-xs font-semibold flex items-center gap-2"
                    style={{ color: r.key === role ? "var(--accent)" : "rgba(255,255,255,0.7)" }}
                  >
                    {r.label}
                    <span
                      className="font-mono font-normal"
                      style={{ opacity: 0.6, fontSize: "10px" }}
                    >
                      {r.portalPath}
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {r.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats footer */}
        <div
          className="relative z-10 flex gap-6"
          style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
        >
          {[
            { value: "256-bit", label: "Encryption" },
            { value: "5 Roles", label: "Access Levels" },
            { value: "Real-time", label: "Case Updates" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-lg font-semibold" style={{ color: "var(--accent)" }}>
                {s.value}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile back */}
          <Link
            to="/"
            className="lg:hidden flex items-center gap-2 text-sm mb-8"
            style={{ color: "var(--muted-foreground)" }}
          >
            ← Back
          </Link>

          <h1
            className="font-serif text-3xl font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Sign In
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
            Select your access level, then sign in to your portal.
          </p>

          {/* Role selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {ROLES.map((r) => (
              <button
                key={r.key}
                onClick={() => { setRole(r.key); setError(""); }}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap"
                style={
                  role === r.key
                    ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                    : { border: "1px solid var(--border)", color: "var(--muted-foreground)" }
                }
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Selected role info + portal URL */}
          <div
            className="px-4 py-3 mb-6 shadow-sm border border-black/5"
            style={{
              background: "var(--muted)",
              borderLeft: "2px solid var(--primary)",
            }}
          >
            <div className="text-xs mb-1">
              <span style={{ color: "var(--primary)", fontWeight: 600 }}>{selected.label}: </span>
              <span style={{ color: "var(--muted-foreground)" }}>{selected.desc}</span>
            </div>
            <div className="text-xs font-mono flex items-center gap-1.5" style={{ color: "var(--muted-foreground)", opacity: 0.7 }}>
              <span>Portal URL:</span>
              <span style={{ color: "var(--primary)", fontWeight: "bold" }}>{selected.portalPath}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="p-3 text-sm"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                className="block text-xs font-mono mb-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={demo.email}
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label
                className="block text-xs font-mono mb-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-xs" style={{ color: "var(--primary)" }}>
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold tracking-wide shadow-md transition-opacity mt-2 disabled:opacity-50"
              style={{ background: "var(--primary)", color: "white" }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "var(--accent)", e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--primary)", e.currentTarget.style.color = "white")}
            >
              {loading ? "Signing in…" : `Sign In as ${selected.label}`}
            </button>
          </form>

          <p className="text-xs text-center mt-8" style={{ color: "var(--muted-foreground)" }}>
            Need access? Contact{" "}
            <a
              href="mailto:admin@stalwartlc.com"
              style={{ color: "var(--primary)" }}
            >
              admin@stalwartlc.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
