const fs = require('fs');
let code = fs.readFileSync('src/api.ts', 'utf8');

const additions = \

// --- ADDITIONAL MODULE FETCHERS ---
export async function fetchTasks() {
    const res = await fetch(\\\\\\/tasks\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchEvents() {
    const res = await fetch(\\\\\\/events\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchCommunications() {
    const res = await fetch(\\\\\\/communications\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchApprovals() {
    const res = await fetch(\\\\\\/approvals\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchNotifications() {
    const res = await fetch(\\\\\\/notifications\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchAuditLogs() {
    const res = await fetch(\\\\\\/audit\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}
export async function fetchVerificationRecords() {
    const res = await fetch(\\\\\\/verification\\\);
    if (!res.ok) throw new Error('Failed'); return res.json();
}

// CUD Operations for Tasks & Events
export async function createTask(data: any) {
    const res = await fetch(\\\\\\/tasks\\\, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    return res.json();
}
export async function createEvent(data: any) {
    const res = await fetch(\\\\\\/events\\\, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    return res.json();
}
\;

fs.writeFileSync('src/api.ts', code + additions);
