import { useState, useEffect } from "react";
import { getSession } from "../../auth";
import { fetchUsers, createUser } from "../../api";

export default function Administration() {
    const session = getSession();
    const canAddEmployee = session?.role === 'super_admin' || session?.role === 'exec_secretary';

    const [staff, setStaff] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newStaff, setNewStaff] = useState({
        name: "",
        email: "",
        role: "lawyer",
        phone: ""
    });

    useEffect(() => {
        async function load() {
            try {
                const u = await fetchUsers();
                setStaff(u);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parts = newStaff.name.split(" ");
            const firstName = parts[0];
            const lastName = parts.slice(1).join(" ");
            await createUser({
                firstName,
                lastName,
                email: newStaff.email,
                role: newStaff.role,
                phone: newStaff.phone,
                passwordHash: "temp-password-hash" // This would trigger password email workflow in actual production
            });
            window.location.reload();
        } catch (err) {
            console.error("Error creating user", err);
            alert("Failed to create user");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Administration</h1>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">Manage firm users, roles, and system settings.</p>
                </div>
                {canAddEmployee && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all"
                    >
                        + Add Employee
                    </button>
                )}
            </div>

            {/* Form Modal */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--card)] w-full max-w-md rounded-lg shadow-xl p-6 border border-[var(--border)] relative">
                        <h2 className="text-xl font-serif font-semibold mb-4 text-[var(--foreground)]">Add New Employee</h2>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Full Name</label>
                                <input required value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Email</label>
                                <input required type="email" value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Role</label>
                                <select value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]">
                                    <option value="lawyer">Lawyer</option>
                                    <option value="front_desk">Front Desk</option>
                                    <option value="exec_secretary">Exec Secretary</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Phone</label>
                                <input required value={newStaff.phone} onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-[var(--border)] text-sm rounded hover:bg-[var(--muted)]">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded hover:brightness-110">Save Employee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-5">
                {staff.map((s: any) => {
                    const fullName = s.name || `${s.firstName || ''} ${s.lastName || ''}`.trim() || s.email || 'System User';
                    const initials = fullName.split(" ").map((w: string) => w[0] || '').join("").slice(0, 2).toUpperCase();
                    const sRole = s.role || 'staff';
                    const isActive = s.status === 'active' || s.active;

                    return (
                        <div key={s._id || s.id} className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full">
                                    {initials}
                                </div>
                                <div>
                                    <div className="font-serif text-sm font-semibold text-[var(--foreground)]">{fullName}</div>
                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[var(--secondary)] text-[var(--secondary-foreground)] rounded">
                                        {sRole.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs mb-4">
                                <div className="flex gap-2">
                                    <span className="font-mono w-16 text-[var(--muted-foreground)]">Email</span>
                                    <span className="text-[var(--foreground)] truncate" title={s.email}>{s.email}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-mono w-16 text-[var(--muted-foreground)]">Phone</span>
                                    <span className="text-[var(--foreground)]">{s.phone || 'Not Provided'}</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-gray-400"}`} />
                                    <span className="text-xs font-mono text-[var(--muted-foreground)]">{isActive ? "Active" : "Inactive"}</span>
                                </div>
                                {canAddEmployee && (
                                    <button className="text-xs text-[var(--primary)] hover:underline font-medium">Edit Access</button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
