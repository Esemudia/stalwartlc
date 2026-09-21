const fs = require('fs');
let code = fs.readFileSync('src/api.ts', 'utf8');

const replacement = \
export async function uploadDocument(data: any, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(data).forEach(k => {
        formData.append(k, data[k]);
    });
    
    const res = await fetch(\\\\\\/documents/upload\\\, {
        method: 'POST',
        body: formData
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
}
\;

// Replace whatever is at the very end (from my faulty append) using a regex or split
let lines = code.split('\\n');
let safeLines = [];
for (let line of lines) {
   if (line.includes('export async function uploadDocument')) {
       break;
   }
   safeLines.push(line);
}
fs.writeFileSync('src/api.ts', safeLines.join('\\n') + replacement);
