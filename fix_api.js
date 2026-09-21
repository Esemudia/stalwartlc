const fs = require('fs');
let code = fs.readFileSync('src/api.ts', 'utf8');
const lines = code.split('\n');
const fixedLines = lines.slice(0, 53);
fixedLines.push(
// --- UPDATE ENDPOINTS ---

export async function updateClient(id: string, data: any) {
    const res = await fetch(\\/clients/\\, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateMatter(id: string, data: any) {
    const res = await fetch(\\/matters/\\, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateDocument(id: string, data: any) {
    const res = await fetch(\\/documents/\\, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

export async function updateUser(id: string, data: any) {
    const res = await fetch(\\/users/\\, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// --- SINGLE READ ENDPOINTS ---

export async function getClient(id: string) {
    const res = await fetch(\\/clients/\\);
    return res.json();
}

export async function getMatter(id: string) {
    const res = await fetch(\\/matters/\\);
    return res.json();
}

export async function getDocument(id: string) {
    const res = await fetch(\\/documents/\\);
    return res.json();
}

export async function getUser(id: string) {
    const res = await fetch(\\/users/\\);
    return res.json();
}

// --- DELETE & ARCHIVE ENDPOINTS ---

export async function archiveClient(id: string) {
    const res = await fetch(\\/clients/\/archive\, { method: 'POST' });
    return res.json();
}

export async function closeMatter(id: string) {
    const res = await fetch(\\/matters/\/close\, { method: 'POST' });
    return res.json();
}

export async function assignLawyersToMatter(id: string, lawyerIds: string[]) {
    const res = await fetch(\\/matters/\/assign\, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerIds })
    });
    return res.json();
}

export async function deleteDocument(id: string) {
    const res = await fetch(\\/documents/\\, { method: 'DELETE' });
    return res.json();
}

export async function createUser(data: any) {
    const res = await fetch(\\/users\, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
}
);
fs.writeFileSync('src/api.ts', fixedLines.join('\n'));
