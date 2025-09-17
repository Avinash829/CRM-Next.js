"use client";
import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Contacts() {
    const api = useApi();
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
        tags: "",
    });
    const [currentContact, setCurrentContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    async function fetchContacts() {
        try {
            const res = await api.get("/contacts");
            if (res.success) setContacts(res.data);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
    }

    async function addContact(e) {
        e.preventDefault();
        try {
            const res = await api.post("/contacts", {
                ...newContact,
                tags: newContact.tags.split(",").map(t => t.trim()).filter(Boolean),
            });
            if (res.success) {
                setContacts([res.data, ...contacts]);
                setNewContact({ name: "", email: "", phone: "", company: "", notes: "", tags: "" });
                setShowAddForm(false);
            }
        } catch (error) {
            console.error("Failed to add contact:", error);
        }
    }

    async function deleteContact(id) {
        if (!confirm("Are you sure you want to delete this contact?")) return;
        try {
            const res = await api.delete(`/contacts/${id}`);
            if (res.success) setContacts(contacts.filter(c => c._id !== id));
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    }

    async function editContact(e) {
        e.preventDefault();
        try {
            const res = await api.put(`/contacts/${currentContact._id}`, {
                ...currentContact,
                tags: Array.isArray(currentContact.tags)
                    ? currentContact.tags.map(t => t.trim()).filter(Boolean)
                    : (currentContact.tags || "").split(",").map(t => t.trim()).filter(Boolean),
            });
            if (res.success) {
                setContacts(contacts.map(c => (c._id === currentContact._id ? res.data : c)));
                setShowEditForm(false);
                setCurrentContact(null);
            }
        } catch (error) {
            console.error("Failed to edit contact:", error);
        }
    }


    const filtered = contacts.filter(c =>
        [c.name, c.email, c.company, c.notes, ...(c.tags || [])]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contacts</h2>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    className="border p-2 rounded w-full md:max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? "Cancel" : "+ Add Contact"}
                </Button>
            </div>

            {/* Add Contact Form */}
            {showAddForm && (
                <form onSubmit={addContact} className="mb-4 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Name *"
                        className="border p-2 rounded"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        className="border p-2 rounded"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="border p-2 rounded"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        className="border p-2 rounded"
                        value={newContact.company}
                        onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                    />
                    <textarea
                        placeholder="Notes"
                        className="border p-2 rounded"
                        value={newContact.notes}
                        onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="border p-2 rounded"
                        value={newContact.tags}
                        onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                    />
                    <Button type="submit">Add Contact</Button>
                </form>
            )}

            {/* Edit Contact Modal */}
            {showEditForm && currentContact && (
                <form onSubmit={editContact} className="mb-4 p-4 border rounded-lg bg-gray-50 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold mb-2">Edit Contact</h3>
                    <input
                        type="text"
                        placeholder="Name *"
                        className="border p-2 rounded"
                        value={currentContact.name}
                        onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        className="border p-2 rounded"
                        value={currentContact.email}
                        onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="border p-2 rounded"
                        value={currentContact.phone}
                        onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        className="border p-2 rounded"
                        value={currentContact.company}
                        onChange={(e) => setCurrentContact({ ...currentContact, company: e.target.value })}
                    />
                    <textarea
                        placeholder="Notes"
                        className="border p-2 rounded"
                        value={currentContact.notes}
                        onChange={(e) => setCurrentContact({ ...currentContact, notes: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma separated)"
                        className="border p-2 rounded"
                        value={currentContact.tags}
                        onChange={(e) => setCurrentContact({ ...currentContact, tags: e.target.value })}
                    />
                    <div className="flex gap-2">
                        <Button type="submit">Save Changes</Button>
                        <Button variant="destructive" onClick={() => setShowEditForm(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 border-b">
                        <tr>
                            <th className="py-3">Name</th>
                            <th className="py-3">Company</th>
                            <th className="py-3">Phone</th>
                            <th className="py-3">Notes</th>
                            <th className="py-3">Tags</th>
                            <th className="py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c) => (
                            <tr key={c._id} className="border-b last:border-b-0">
                                <td className="py-4">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-400">{c.email}</div>
                                </td>
                                <td>{c.company}</td>
                                <td>{c.phone}</td>
                                <td>{c.notes}</td>
                                <td>
                                    <div className="flex gap-2">
                                        {c.tags?.map((t) => (
                                            <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => { setCurrentContact(c); setShowEditForm(true); }}>
                                            Edit
                                        </Button>
                                        <Button size="sm" className="bg-gray-300" variant="destructive" onClick={() => deleteContact(c._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className="text-gray-500 mt-4">No contacts found.</p>
                )}
            </div>
        </div>
    );
}
