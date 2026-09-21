import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchClients, fetchMatters, fetchDocuments } from "../../api";

export default function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ clients: 0, matters: 0, docs: 0 });

    useEffect(() => {
        async function load() {
            try {
                const [c, m, d] = await Promise.all([fetchClients(), fetchMatters(), fetchDocuments()]);
                setStats({ clients: c.length, matters: m.length, docs: d.length });
            } catch (err) { }
        }
        load();
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Firm Overview</h1>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/internal/matters')}
                        className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all"
                    >
                        + New Matter
                    </button>
                    <button
                        onClick={() => navigate('/internal/clients')}
                        className="px-4 py-2 bg-[var(--secondary)] text-[var(--secondary-foreground)] text-sm font-medium rounded shadow-sm hover:brightness-95 transition-all"
                    >
                        + New Client
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "Total Clients", count: stats.clients },
                    { label: "Active Matters", count: stats.matters },
                    { label: "Firm Documents", count: stats.docs },
                    { label: "Tasks Due", count: 2 },
                    { label: "Upcoming Court", count: 1 },
                    { label: "Approvals", count: 0 },
                ].map(k => (
                    <div key={k.label} className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
                        <div className="text-3xl font-mono text-[var(--primary)] mb-1 font-semibold">{k.count}</div>
                        <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">{k.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Activity Feed */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif text-xl font-medium">Activity Feed</h2>
                        <Link to="/internal/archive" className="text-sm text-[var(--primary)] hover:underline">View all</Link>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden line-clamp-none">
                        {[
                            { time: "09:32", text: "John uploaded a document", highlight: "Contract.pdf" },
                            { time: "10:05", text: "Partner approved a contract", highlight: "ABC Merger" },
                            { time: "10:42", text: "New client registered", highlight: "TechNova Inc." },
                            { time: "11:10", text: "Court deadline added", highlight: "Civil Suit 442" },
                            { time: "Yesterday", text: "Invoice #1042 paid", highlight: "NGN 450,000" },
                        ].map((feed, i) => (
                            <div key={i} className="p-4 border-b border-[var(--border)] last:border-0 flex gap-4 hover:bg-[var(--muted)]/50 transition-colors">
                                <div className="text-xs font-mono text-[var(--muted-foreground)] w-12 pt-0.5 shrink-0">{feed.time}</div>
                                <div>
                                    <div className="text-sm text-[var(--foreground)]">{feed.text}</div>
                                    <div className="text-xs text-[var(--primary)] mt-1 font-medium">{feed.highlight}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-serif text-xl font-medium">Upcoming Deadlines</h2>
                        <Link to="/internal/calendar" className="text-sm text-[var(--primary)] hover:underline">Full calendar</Link>
                    </div>
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
                        <div className="grid grid-cols-5 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)]/50 p-4 border-b border-[var(--border)]">
                            <div className="col-span-2">Matter</div>
                            <div>Deadline</div>
                            <div>Lawyer</div>
                            <div>Status</div>
                        </div>
                        {[
                            { matter: "STW/2026/012 - ABC Land Auth", deadline: "Today, 14:00", lawyer: "Chukwuemeka", status: "Critical" },
                            { matter: "STW/2026/044 - Merger Review", deadline: "Tomorrow, 09:00", lawyer: "Adaeze", status: "Pending" },
                            { matter: "STW/2026/008 - Contract Draft", deadline: "24 Aug 2026", lawyer: "Babatunde", status: "In Progress" },
                        ].map((d, i) => (
                            <div key={i} className="grid grid-cols-5 text-sm p-4 border-b border-[var(--border)] last:border-0 items-center">
                                <div className="col-span-2 font-medium text-[var(--foreground)] truncate pr-4">{d.matter}</div>
                                <div className="font-mono text-xs">{d.deadline}</div>
                                <div className="text-[var(--muted-foreground)]">{d.lawyer}</div>
                                <div>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${d.status === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                                        d.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                            'bg-slate-100 text-slate-700 border border-slate-200'
                                        }`}>
                                        {d.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
