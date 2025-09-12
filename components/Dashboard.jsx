import React from 'react';

export default function DashboardPage() {
    const stats = [
        { title: 'Total Contacts', value: 3, color: 'bg-blue-100', icon: '👥' },
        { title: 'Active Leads', value: 3, color: 'bg-green-100', icon: '🟢' },
        { title: 'Pipeline Value', value: '$115,000', color: 'bg-purple-100', icon: '💰' },
        { title: 'Conversion Rate', value: '0.0%', color: 'bg-orange-100', icon: '📈' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
            <p className="text-gray-500 mb-6">Welcome back! Here's what's happening with your sales.</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {stats.map((s) => (
                    <div key={s.title} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`p-3 rounded-md ${s.color}`}>{s.icon}</div>
                                <div>
                                    <div className="text-xs text-gray-500">{s.title}</div>
                                    <div className="text-xl font-semibold">{s.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Leads by Status</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">[Bar Chart placeholder]</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center text-gray-400">[Line Chart placeholder]</div>
                </div>
            </div>
        </div>
    );
}
