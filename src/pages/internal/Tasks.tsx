import { useState, useEffect } from "react";
import { fetchTasks, createTask } from "../../api";

export default function Tasks() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks().then(setTasks).finally(() => setLoading(false));
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim() === "") return;
        try {
            await createTask({ title: newTask, priority: "High", status: "pending" });
            const updated = await fetchTasks();
            setTasks(updated);
            setNewTask("");
            setIsAdding(false);
        } catch (e) { }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-10">
            {/* <div className="flex items-center justify-between">
                <h1 className="font-serif text-3xl font-semibold text-[var(--foreground)]">Tasks</h1>
                <button onClick={() => setIsAdding(true)} className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded shadow-sm hover:brightness-110 transition-all">+ Create Task</button>
            </div> */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-[var(--card)] w-full max-w-md rounded-lg shadow-xl p-6 border border-[var(--border)]">
                        <h2 className="text-xl font-serif font-semibold mb-4 text-[var(--foreground)]">Create Task</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Task Details</label>
                                <input autoFocus required value={newTask} onChange={e => setNewTask(e.target.value)} className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 border border-[var(--border)] text-sm rounded hover:bg-[var(--muted)]">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded hover:brightness-110">Save Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {loading ? <p className="text-[var(--muted-foreground)] p-5">Loading tasks via active API...</p> : tasks.length === 0 ? (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm p-8 text-center mt-6">
                    <h2 className="text-lg font-medium text-[var(--foreground)]">No active tasks</h2>
                </div>
            ) : (
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm mt-6 divide-y divide-[var(--border)]">
                    {tasks.map((t) => (
                        <div key={t._id} className="p-4 flex items-center justify-between hover:bg-[var(--muted)]/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium">{t.title}</span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium shadow-sm">{t.priority || 'Normal'}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
