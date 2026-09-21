export const API_BASE = '/api/v1';

export async function fetchClients() {
    const res = await fetch(`${API_BASE}/clients`);
    if (!res.ok) throw new Error('Failed to fetch clients');
    return res.json();
}

export async function fetchMatters() {
    const res = await fetch(`${API_BASE}/matters`);
    if (!res.ok) throw new Error('Failed to fetch matters');
    return res.json();
}

export async function fetchDocuments() {
    const res = await fetch(`${API_BASE}/documents`);
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
}

export async function fetchUsers() {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
}

export async function createClient(data: any) {
    const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function createMatter(data: any) {
    const res = await fetch(`${API_BASE}/matters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function createDocument(data: any) {
    const res = await fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function createUser(data: any) {
    const res = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
}

export async function updateClient(id: string, data: any) {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateMatter(id: string, data: any) {
    const res = await fetch(`${API_BASE}/matters/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateDocument(id: string, data: any) {
    const res = await fetch(`${API_BASE}/documents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateUser(id: string, data: any) {
    const res = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function getClient(id: string) {
    const res = await fetch(`${API_BASE}/clients/${id}`);
    return res.json();
}

export async function getMatter(id: string) {
    const res = await fetch(`${API_BASE}/matters/${id}`);
    return res.json();
}

export async function getDocument(id: string) {
    const res = await fetch(`${API_BASE}/documents/${id}`);
    return res.json();
}

export async function getUser(id: string) {
    const res = await fetch(`${API_BASE}/users/${id}`);
    return res.json();
}

export async function archiveClient(id: string) {
    const res = await fetch(`${API_BASE}/clients/${id}/archive`, { method: 'POST' });
    return res.json();
}

export async function closeMatter(id: string) {
    const res = await fetch(`${API_BASE}/matters/${id}/close`, { method: 'POST' });
    return res.json();
}

export async function assignLawyersToMatter(id: string, lawyerIds: string[]) {
    const res = await fetch(`${API_BASE}/matters/${id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerIds })
    });
    return res.json();
}

export async function deleteDocument(id: string) {
    const res = await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
    return res.json();
}

export async function deleteUser(id: string) {
    const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
    return res.json();
}

export async function uploadDocument(data: any, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(data).forEach(k => {
        formData.append(k, data[k]);
    });

    const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        body: formData
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
}

export async function fetchTasks() { const res = await fetch(`${API_BASE}/tasks`); if (!res.ok) throw new Error(); return res.json(); }
export async function createTask(data: any) { const res = await fetch(`${API_BASE}/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return res.json(); }
export async function updateTask(id: string, data: any) { const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return res.json(); }
export async function fetchEvents() { const res = await fetch(`${API_BASE}/events`); if (!res.ok) throw new Error(); return res.json(); }
export async function createEvent(data: any) { const res = await fetch(`${API_BASE}/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return res.json(); }
export async function updateEvent(id: string, data: any) { const res = await fetch(`${API_BASE}/events/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return res.json(); }
export async function fetchInvoices() { const res = await fetch(`${API_BASE}/invoices`); if (!res.ok) throw new Error(); return res.json(); }
export async function createInvoice(data: any) { const res = await fetch(`${API_BASE}/invoices`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return res.json(); }
export async function fetchCommunications() { const res = await fetch(`${API_BASE}/communications`); if (!res.ok) throw new Error(); return res.json(); }
export async function fetchVerificationRecords() { const res = await fetch(`${API_BASE}/verification`); if (!res.ok) throw new Error(); return res.json(); }
export async function fetchAuditLogs() { const res = await fetch(`${API_BASE}/audit`); if (!res.ok) throw new Error(); return res.json(); }


export async function login(data: any) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
}
