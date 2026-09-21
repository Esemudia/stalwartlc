import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../../auth";

const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/internal/dashboard", icon: "📊" },
    { id: "clients", label: "Clients", path: "/internal/clients", icon: "👥" },
    { id: "matters", label: "Matters", path: "/internal/matters", icon: "⚖️" },
    { id: "documents", label: "Documents", path: "/internal/documents", icon: "📄" },
    { id: "tasks", label: "Tasks", path: "/internal/tasks", icon: "✓" },
    { id: "calendar", label: "Calendar", path: "/internal/calendar", icon: "📅" },
    { id: "communications", label: "Communications", path: "/internal/communications", icon: "✉️" },
    { id: "billing", label: "Billing", path: "/internal/billing", icon: "💳" },
    { id: "reports", label: "Reports", path: "/internal/reports", icon: "📉" },
    { id: "verification", label: "Verification", path: "/internal/verification", icon: "🛡️" },
    { id: "archive", label: "Archive", path: "/internal/archive", icon: "🗄️" },
    { id: "administration", label: "Administration", path: "/internal/administration", icon: "⚙️" },
];

export default function Shell() {
    const location = useLocation();
    const navigate = useNavigate();
    const session = getSession();

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
            {/* Premium Navy Sidebar */}
            <aside className="w-64 flex-shrink-0 flex flex-col bg-[var(--primary)] text-white shadow-xl z-20">
                <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0 gap-3">
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-bold bg-[var(--accent)] text-[var(--primary)] rounded-sm shadow-sm">
                        SLC
                    </div>
                    <span className="font-serif text-lg font-semibold tracking-wide text-[var(--accent)]">StalwartLC</span>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${isActive
                                        ? "bg-[var(--accent)] text-[var(--primary)] font-semibold shadow-md"
                                        : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--primary)] font-bold text-xs ring-2 ring-white/20">
                            {session?.name ? session.name.substring(0, 2).toUpperCase() : "U"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">{session?.name || "User"}</span>
                            <span className="text-xs text-[var(--accent)] capitalize tracking-wide">{session?.role?.replace("_", " ") || "Staff"}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 text-xs border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium tracking-wide uppercase"
                    >
                        Sign out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
                <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-[var(--border)] shrink-0 shadow-sm z-10">
                    <div className="flex flex-col">
                        <div className="font-serif text-lg font-semibold text-[var(--primary)]">
                            {navItems.find(n => location.pathname.startsWith(n.path))?.label || "Workspace"}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-[var(--primary)] hover:opacity-70 relative p-2 rounded-full hover:bg-[var(--primary)]/5 transition-colors">
                            🔔
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
