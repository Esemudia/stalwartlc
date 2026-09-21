import { useState, useEffect } from "react";
import { fetchAuditLogs } from "../../api";

export default function Reports() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuditLogs().then(setLogs).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div>
                <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">System Audit & Reports</h1>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Immutable ledger tracking sensitive platform operations.</p>
            </div>

            {loading ? <p className="text-[var(--muted-foreground)] p-5">Querying audit trail module...</p> : (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-6 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)]/50 p-4 border-b border-[var(--border)]">
                        <div className="col-span-2">Action Executed</div>
                        <div>User Profile</div>
                        <div>Target</div>
                        <div className="col-span-2 text-right">Timestamp</div>
                    </div>
                    {logs.length === 0 ? <p className="p-8 text-center text-sm text-[var(--muted-foreground)]">Super-Admin log is currently empty.</p> : logs.map(l => (
                        <div key={l._id} className="grid grid-cols-6 p-4 text-sm items-center hover:bg-[var(--muted)]/30 border-b border-[var(--border)] last:border-0 transition-colors">
                            <div className="col-span-2 font-medium text-[var(--primary)]">{l.action || 'Unknown Operation'}</div>
                            <div className="font-mono text-xs text-[var(--foreground)]">{l.user || 'System Process'}</div>
                            <div className="text-[var(--muted-foreground)] text-xs truncate pr-4">{l.target || 'N/A'}</div>
                            <div className="col-span-2 text-right font-mono text-xs text-[var(--muted-foreground)]">
                                {l.createdAt ? new Date(l.createdAt).toLocaleString() : 'Just now'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
