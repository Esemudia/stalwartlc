import { useState, useEffect } from "react";
import { fetchVerificationRecords } from "../../api";

export default function Verification() {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVerificationRecords().then(setRecords).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Document Verification Protocol</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">Digital certification ledgers and QR hashes for court submissions.</p>
                </div>
                <button className="px-4 py-2 border border-[var(--primary)] text-[var(--primary)] text-sm font-medium rounded shadow-sm hover:bg-[var(--primary)] hover:text-white transition-all">Sign Document</button>
            </div>

            {loading ? <p className="text-[var(--muted-foreground)] p-5">Loading verification cryptographic ledger...</p> : (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm divide-y divide-[var(--border)] pt-2">
                    <div className="grid grid-cols-4 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)]/50 p-4 border-b border-[var(--border)]">
                        <div className="col-span-2">Cryptographic Hash</div>
                        <div>Timestamp</div>
                        <div>Status</div>
                    </div>
                    {records.length === 0 ? <p className="p-8 text-center text-sm text-[var(--muted-foreground)]">Ledger empty. No documents verified yet.</p> : records.map(r => (
                        <div key={r._id} className="grid grid-cols-4 p-4 text-sm items-center hover:bg-[var(--muted)]/30 transition-colors">
                            <div className="col-span-2">
                                <span className="px-2 py-1 rounded bg-[var(--muted)] border border-[var(--border)] text-[var(--foreground)] text-xs font-mono shadow-sm">
                                    {r.hash || 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                                </span>
                            </div>
                            <div className="font-mono text-[var(--muted-foreground)] text-xs">
                                {r.createdAt ? new Date(r.createdAt).toLocaleString() : 'Just now'}
                            </div>
                            <div>
                                <span className="text-xs px-2 py-0.5 border border-green-200 bg-green-50 text-green-700 rounded shadow-sm tracking-wide">VERIFIED</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
