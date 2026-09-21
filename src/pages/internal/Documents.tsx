import { useState, useEffect } from "react";
import { fetchDocuments, uploadDocument } from "../../api";
import PdfViewer from "../../components/PdfViewer";
import DocxViewer from "../../components/DocxViewer";

export default function Documents() {
    const [searchTerm, setSearchTerm] = useState("");
    const [docsList, setDocsList] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newDoc, setNewDoc] = useState({ name: "", caseId: "STW-NEW", type: "evidence" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewName, setPreviewName] = useState<string>("");

    useEffect(() => {
        async function load() {
            try {
                const d = await fetchDocuments();
                setDocsList(d);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a physical file.");
            return;
        }

        try {
            await uploadDocument({
                name: newDoc.name,
                documentNumber: `STW-DOC-00${docsList.length + 50}`,
                category: newDoc.type,
                matterId: newDoc.caseId
            }, selectedFile);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Documents</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">Central repository for all firm-wide document versions.</p>
                </div>
                {/* <button
                    onClick={() => setIsUploading(true)}
                    className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all"
                >
                    Upload Document
                </button> */}
            </div>

            {/* {isUploading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--card)] w-full max-w-md rounded-lg shadow-xl p-6 border border-[var(--border)]">
                        <h2 className="text-xl font-serif font-semibold mb-4 text-[var(--foreground)]">Upload Physical Document</h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Document File (.pdf, .docx)*</label>
                                <input required type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)} className="w-full text-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-white hover:file:brightness-110" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">File Name</label>
                                <input required value={newDoc.name} onChange={e => setNewDoc({ ...newDoc, name: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Matter Reference ID</label>
                                <input required value={newDoc.caseId} onChange={e => setNewDoc({ ...newDoc, caseId: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Category</label>
                                <select value={newDoc.type} onChange={e => setNewDoc({ ...newDoc, type: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]">
                                    <option value="evidence">Evidence</option>
                                    <option value="contract">Agreement/Contract</option>
                                    <option value="pleading">Court Pleading</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsUploading(false)} className="px-4 py-2 border border-[var(--border)] text-sm rounded hover:bg-[var(--muted)]">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded hover:brightness-110">Upload File</button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] opacity-70">🔍</span>
                    <input
                        type="text"
                        placeholder="Search documents by name, matter, or tag..."
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md pl-10 pr-4 py-2 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {previewUrl && (
                <div className="fixed inset-0 bg-black/80 z-50 flex flex-col p-4 items-center justify-center">
                    <div className="w-full max-w-5xl h-[85vh] bg-[var(--card)] rounded-lg shadow-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-gray-50">
                            <h2 className="font-semibold text-[var(--foreground)] pr-4 truncate font-serif text-lg">Preview: {previewName}</h2>
                            <button onClick={() => { setPreviewUrl(null); setPreviewName(""); }} className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded hover:brightness-110 shadow-sm transition-colors">
                                Close
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            {previewUrl.toLowerCase().endsWith('.pdf') ? (
                                <PdfViewer fileUrl={previewUrl} />
                            ) : previewUrl.toLowerCase().endsWith('.docx') ? (
                                <DocxViewer fileUrl={previewUrl} />
                            ) : (
                                <div className="p-10 text-center text-red-500 font-bold bg-white h-full flex flex-col items-center justify-center">
                                    <span className="text-4xl mb-4">⚠️</span>
                                    Unsupported secure preview format. Access Denied.
                                    <div className="mt-4">
                                        <a href={previewUrl} target="_blank" rel="noreferrer" download className="text-blue-600 underline text-sm font-normal">
                                            Download anyway
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
                <div className="grid grid-cols-6 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)]/50 p-4 border-b border-[var(--border)]">
                    <div className="col-span-2">File Name</div>
                    <div>Matter / Client</div>
                    <div>Category</div>
                    <div>Uploaded By</div>
                    <div className="text-right">Actions</div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-[var(--muted-foreground)] text-sm">Loading backing store...</div>
                ) : (docsList || [])
                    .filter((d: any) => {
                        const term = searchTerm.toLowerCase();
                        return (d.name || '').toLowerCase().includes(term) ||
                            (d.matterId || '').toString().toLowerCase().includes(term) ||
                            (d.category || '').toLowerCase().includes(term) ||
                            (d.documentNumber || '').toLowerCase().includes(term);
                    })
                    .map((d: any) => (
                        <div key={d._id} className="grid grid-cols-6 text-sm p-4 border-b border-[var(--border)] items-center hover:bg-[var(--muted)]/30 transition-colors last:border-0">
                            <div className="col-span-2 flex items-center gap-3">
                                <span className="text-xl">📄</span>
                                <div>
                                    <div className="font-medium text-[var(--foreground)]">{d.name}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] opacity-70">
                                        V.{d.currentVersion || 1} • {d.documentNumber}
                                    </div>
                                </div>
                            </div>
                            <div className="font-mono text-xs text-[var(--muted-foreground)]">{d.matterId || "N/A"}</div>
                            <div>
                                <span className="text-xs px-2 py-1 bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] rounded font-mono capitalize">
                                    {d.category}
                                </span>
                            </div>
                            <div className="text-[var(--muted-foreground)]">System</div>
                            <div className="text-right space-x-3 text-xs flex justify-end">
                                {d.fileUrl ? (
                                    <button
                                        onClick={() => { setPreviewUrl(d.fileUrl); setPreviewName(d.name || d.documentNumber); }}
                                        className="px-4 py-1.5 bg-[var(--primary)] text-white rounded font-medium shadow-sm hover:brightness-110 transition-colors"
                                    >
                                        Preview
                                    </button>
                                ) : (
                                    <span className="px-3 py-1.5 bg-[var(--muted)] text-[var(--muted-foreground)] rounded font-medium shadow-sm">No File</span>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
