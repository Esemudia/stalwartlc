import { Link } from "react-router-dom";

export default function Billing() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Billing & Invoices</h1>
                <Link
                    to="/internal/billing/new"
                    className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all inline-block"
                >
                    Create Invoice
                </Link>
            </div>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden p-8 text-center">
                <div className="text-5xl mb-4 opacity-50">💳</div>
                <h2 className="text-lg font-medium text-[var(--foreground)]">No invoices found</h2>
            </div>
        </div>
    );
}
