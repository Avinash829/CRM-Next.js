import React from 'react';
import Link from 'next/link';

const leads = [
    {
        name: 'Alice Brown',
        email: 'alice@startup.io',
        company: 'Startup.io',
        value: '$25,000',
        status: 'Qualified',
        probability: 75,
        expected: 'Feb 15, 2024',
        owner: 'Alex Rodriguez',
    },
    {
        name: 'David Wilson',
        email: 'david@enterprise.com',
        company: 'Enterprise Corp',
        value: '$75,000',
        status: 'Proposal',
        probability: 60,
        expected: 'Mar 1, 2024',
        owner: 'Sarah Martinez',
    },
    {
        name: 'Emma Davis',
        email: 'emma@growth.co',
        company: 'Growth Co',
        value: '$15,000',
        status: 'New',
        probability: 25,
        expected: 'Feb 28, 2024',
        owner: 'Mike Johnson',
    },
];

export default function LeadsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Leads</h2>
                    <p className="text-gray-500">Track and manage your sales opportunities</p>
                </div>

                <div>
                    <Link href="/leads/new" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
                        + Add Lead
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-4 items-center mb-4">
                    <input placeholder="Search leads by name, email, or company..." className="flex-1 border rounded-lg px-4 py-3 bg-gray-50" />
                    <select className="border rounded-lg px-3 py-2 bg-white">
                        <option>All Status</option>
                    </select>
                </div>

                <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 border-b">
                        <tr>
                            <th className="py-3">Lead</th>
                            <th className="py-3">Company</th>
                            <th className="py-3">Value</th>
                            <th className="py-3">Status</th>
                            <th className="py-3">Probability</th>
                            <th className="py-3">Expected Close</th>
                            <th className="py-3">Assigned To</th>
                            <th className="py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((l) => (
                            <tr key={l.email} className="border-b last:border-b-0">
                                <td className="py-4">
                                    <div className="font-medium">{l.name}</div>
                                    <div className="text-xs text-gray-400">{l.email}</div>
                                    <div className="text-xs text-gray-300">Website</div>
                                </td>
                                <td>{l.company}</td>
                                <td className="font-semibold">{l.value}</td>
                                <td><span className="text-xs px-2 py-1 rounded-full bg-gray-100">{l.status}</span></td>
                                <td>
                                    <div className="w-28 bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div style={{ width: `${l.probability}%` }} className="h-2 bg-blue-600"></div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">{l.probability}%</div>
                                </td>
                                <td>{l.expected}</td>
                                <td>{l.owner}</td>
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
