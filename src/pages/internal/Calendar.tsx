import { useState, useEffect } from "react";
import { fetchEvents, createEvent } from "../../api";

export default function Calendar() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents().then(setEvents).finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Calendar</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">Firm-wide events and scheduled hearings.</p>
                </div>
                <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all">+ Add Event</button>
            </div>
            {loading ? <p className="text-[var(--muted-foreground)] p-5">Loading calendar events via API...</p> : (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm divide-y divide-[var(--border)] mt-6">
                    {events.length === 0 ? (
                        <div className="p-8 text-center mt-6">
                            <h2 className="text-lg font-medium text-[var(--foreground)]">No upcoming events scheduled.</h2>
                        </div>
                    ) : events.map(e => (
                        <div key={e._id} className="p-5 flex flex-col gap-2 hover:bg-[var(--muted)]/20 transition-colors">
                            <h2 className="font-semibold text-lg text-[var(--primary)]">{e.title || 'Untitled Event'}</h2>
                            <div className="flex gap-4 text-sm text-[var(--foreground)]">
                                <span className="font-mono bg-[var(--muted)] px-2 py-1 rounded">📅 {e.date || 'TBD'}</span>
                                <span className="font-mono bg-[var(--muted)] px-2 py-1 rounded">📍 {e.location || 'Stalwart Office'}</span>
                            </div>
                            {e.description && <p className="text-sm text-[var(--muted-foreground)] mt-1">{e.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
