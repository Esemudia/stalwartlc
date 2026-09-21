import { useState, useEffect } from "react";
import { fetchCommunications } from "../../api";

export default function Communications() {
    const [threads, setThreads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommunications().then(setThreads).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Communications</h1>
                <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all">
                    New Message
                </button>
            </div>
            {loading ? <p className="text-[var(--muted-foreground)] p-5">Loading communications...</p> : (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm divide-y divide-[var(--border)]">
                    {threads.length === 0 ? <p className="p-8 text-center text-[var(--muted-foreground)]">No secure messages yet.</p> : threads.map(t => (
                        <div key={t._id} className="p-5 hover:bg-[var(--muted)]/40 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-semibold text-base text-[var(--foreground)]">{t.subject || t.title || 'Incoming Secure Message'}</h2>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">{t.status || 'Unread'}</span>
                            </div>
                            <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">{t.body || 'Open to view completely encrypted message body.'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
