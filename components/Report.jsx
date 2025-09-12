import React from 'react';

export default function ReportsPage() {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Reports & Analytics</h2>
                    <p className="text-gray-500">Track your sales performance and insights</p>
                </div>

                <div>
                    <select className="border rounded-lg px-3 py-2 bg-white">
                        <option>Last 30 days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-green-600 text-xl font-semibold">$0</div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-blue-600 text-xl font-semibold">$0</div>
                    <div className="text-sm text-gray-500">Avg Deal Size</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-purple-600 text-xl font-semibold">0.0%</div>
                    <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="text-orange-600 text-xl font-semibold">0</div>
                    <div className="text-sm text-gray-500">Avg Sales Cycle (days)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm h-64">Sales Funnel chart placeholder</div>
                <div className="bg-white p-6 rounded-lg shadow-sm h-64">Lead Sources (pie) placeholder</div>
            </div>
        </div>
    );
}
