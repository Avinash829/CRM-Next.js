import React from 'react';
import Link from 'next/link';

const contacts = [
    {
        name: 'John Smith',
        email: 'john.smith@techcorp.com',
        title: 'CTO',
        company: 'TechCorp Inc.',
        phone: '+1 (555) 123-4567',
        last: 'Jan 20, 2024',
        tags: ['enterprise', 'decision-maker'],
    },
    {
        name: 'Sarah Johnson',
        email: 'sarah.j@innovate.co',
        title: 'Product Manager',
        company: 'Innovate Co.',
        phone: '+1 (555) 234-5678',
        last: 'Jan 18, 2024',
        tags: ['startup', 'product'],
    },
    {
        name: 'Michael Chen',
        email: 'm.chen@globaltech.com',
        title: 'VP Engineering',
        company: 'GlobalTech',
        phone: '+1 (555) 345-6789',
        last: 'Jan 22, 2024',
        tags: ['enterprise', 'technical'],
    },
];

export default function ContactsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Contacts</h2>
                    <p className="text-gray-500">Manage your customer relationships</p>
                </div>

                <div>
                    <Link href="/contacts/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
                        + Add Contact
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                    <input
                        placeholder="Search contacts by name, email, or company..."
                        className="w-full border rounded-lg px-4 py-3 bg-gray-50 focus:outline-none"
                    />
                </div>

                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 border-b">
                        <tr>
                            <th className="py-3">Contact</th>
                            <th className="py-3">Company</th>
                            <th className="py-3">Phone</th>
                            <th className="py-3">Last Contact</th>
                            <th className="py-3">Tags</th>
                            <th className="py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((c) => (
                            <tr key={c.email} className="border-b last:border-b-0">
                                <td className="py-4">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-gray-400">{c.email}</div>
                                    <div className="text-xs text-gray-300">{c.title}</div>
                                </td>
                                <td>{c.company}</td>
                                <td>{c.phone}</td>
                                <td className="text-gray-500">{c.last}</td>
                                <td>
                                    <div className="flex gap-2">
                                        {c.tags.map((t) => (
                                            <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{t}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-3">
                                        <button className="text-blue-600">✏️</button>
                                        <button className="text-red-500">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
