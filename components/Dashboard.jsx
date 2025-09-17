"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { FiUsers, FiTrendingUp, FiBriefcase, FiDollarSign } from "react-icons/fi";
import { Button } from "@/components/ui/button";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black hover:cursor-pointer"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

function AddTaskModal({ isOpen, onClose, onAdd }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        dueDate: ""
    });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        // validate required
        if (!form.title || !form.date) {
            setError("Please fill all required (*) fields");
            return;
        }
        try {
            await onAdd(form);
            setForm({ title: "", description: "", date: "", time: "", dueDate: "" });
            setError("");
            onClose();
        } catch (err) {
            setError("Failed to add task");
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-sm">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter title"
                    className="border p-2 rounded"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <label className="text-sm">Description</label>
                <textarea
                    placeholder="Enter description"
                    className="border p-2 rounded"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <label className="text-sm">
                    Date <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />

                <label className="text-sm">Time</label>
                <input
                    type="time"
                    className="border p-2 rounded"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                />

                <label className="text-sm">Due Date</label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />

                <Button className="hover:cursor-pointer" type="submit">Add Task</Button>
            </form>
        </Modal>
    );
}

function EditTaskModal({ isOpen, onClose, task, onEdit }) {
    const [form, setForm] = useState(task || {});
    const [error, setError] = useState("");

    useEffect(() => {
        if (task) {
            setForm({
                ...task,
                date: task.date ? new Date(task.date).toISOString().substr(0, 10) : "",
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().substr(0, 10) : "",
                time: task.time || ""
            });
        }
    }, [task]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.title || !form.date) {
            setError("Please fill all required (*) fields");
            return;
        }
        try {
            await onEdit(task._id, form);
            setError("");
            onClose();
        } catch (err) {
            setError("Failed to edit task");
        }
    }

    if (!task) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-sm">
                    Title <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter title"
                    className="border p-2 rounded"
                    value={form.title || ""}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />

                <label className="text-sm">Description</label>
                <textarea
                    placeholder="Enter description"
                    className="border p-2 rounded"
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <label className="text-sm">
                    Date <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.date || ""}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                />

                <label className="text-sm">Time</label>
                <input
                    type="time"
                    className="border p-2 rounded"
                    value={form.time || ""}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                />

                <label className="text-sm">Due Date</label>
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.dueDate || ""}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />

                <Button className="hover:cursor-pointer" type="submit">Save Changes</Button>
            </form>
        </Modal>
    );
}

export default function Dashboard() {
    const api = useApi();
    const [stats, setStats] = useState({ contacts: 0, leads: 0, deals: 0, pipeline: 0 });
    const [tasks, setTasks] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchStats();
        fetchTasks();
    }, []);

    async function fetchStats() {
        try {
            const res = await api.get("/dashboard/stats");
            if (res?.success && res.data) setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }

    async function fetchTasks() {
        try {
            const res = await api.get("/tasks");
            if (res?.success) setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    async function addTask(task) {
        try {
            const res = await api.post("/tasks", task);
            if (res?.success) setTasks([res.data, ...tasks]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    async function editTask(id, updates) {
        try {
            const res = await api.put(`/tasks/${id}`, updates);
            if (res?.success) {
                setTasks(tasks.map(t => (t._id === id ? res.data : t)));
            }
        } catch (error) {
            console.error("Error editing task:", error);
        }
    }

    async function deleteTask(id) {
        try {
            const res = await api.delete(`/tasks/${id}`);
            if (res?.success) {
                setTasks(tasks.filter(t => t._id !== id));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    async function markComplete(id) {
        await editTask(id, { status: "completed" });
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

            <Card className="shadow-lg rounded-2xl p-4 flex flex-col items-start">
                <FiUsers className="text-3xl text-blue-600 mb-2" />
                <CardContent>
                    <h2 className="text-lg font-semibold">Total Contacts</h2>
                    <p className="text-xl font-bold">{stats.contacts}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg rounded-2xl p-4 flex flex-col items-start">
                <FiTrendingUp className="text-3xl text-green-600 mb-2" />
                <CardContent>
                    <h2 className="text-lg font-semibold">Total Leads</h2>
                    <p className="text-xl font-bold">{stats.leads}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg rounded-2xl p-4 flex flex-col items-start">
                <FiBriefcase className="text-3xl text-purple-600 mb-2" />
                <CardContent>
                    <h2 className="text-lg font-semibold">Total Deals</h2>
                    <p className="text-xl font-bold">{stats.deals}</p>
                </CardContent>
            </Card>
            <Card className="shadow-lg rounded-2xl p-4 flex flex-col items-start">
                <FiDollarSign className="text-3xl text-red-600 mb-2" />
                <CardContent>
                    <h2 className="text-lg font-semibold">Pipeline Value</h2>
                    <p className="text-xl font-bold">${stats.pipeline}</p>
                </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl p-4 col-span-2">
                <CardContent>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">Pending Tasks</h2>
                        <Button className="hover:cursor-pointer" onClick={() => setShowAdd(true)}>+ Add Task</Button>
                    </div>
                    {tasks.filter(t => t.status === "pending").map(task => (
                        <div key={task._id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <h3 className="font-medium">{task.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => markComplete(task._id)} className="text-green-600 hover:underline hover:cursor-pointer">Complete</button>
                                <button onClick={() => { setCurrentTask(task); setShowEdit(true); }} className="text-blue-600 hover:underline hover:cursor-pointer">Edit</button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl p-4 col-span-2">
                <CardContent>
                    <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
                    {tasks.filter(t => t.status === "completed").map(task => (
                        <div key={task._id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <h3 className="font-medium line-through">{task.title}</h3>
                                <p className="text-sm text-gray-500">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
                                </p>
                            </div>
                            <button onClick={() => deleteTask(task._id)} className="text-red-600 hover:underline hover:cursor-pointer">Delete</button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <AddTaskModal isOpen={showAdd} onClose={() => setShowAdd(false)} onAdd={addTask} />
            <EditTaskModal isOpen={showEdit} onClose={() => setShowEdit(false)} task={currentTask} onEdit={editTask} />
        </div>
    );
}
