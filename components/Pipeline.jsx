import React from 'react';

const stages = [
    { key: 'new', title: 'New', color: 'blue', leads: [{ name: 'Emma Davis', company: 'Growth Co', value: '$15,000', prob: 25 }] },
    { key: 'contacted', title: 'Contacted', color: 'yellow', leads: [] },
    { key: 'qualified', title: 'Qualified', color: 'green', leads: [{ name: 'Alice Brown', company: 'Startup.io', value: '$25,000', prob: 75 }] },
    { key: 'proposal', title: 'Proposal', color: 'purple', leads: [{ name: 'David Wilson', company: 'Enterprise Corp', value: '$75,000', prob: 60 }] },
];

export default function PipelinePage() {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Sales Pipeline</h2>
                <p className="text-gray-500">Track deals through your sales process</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stages.map((s) => (
                    <div key={s.key} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${s.color === 'blue' ? 'bg-blue-500' : s.color === 'green' ? 'bg-green-500' : s.color === 'yellow' ? 'bg-yellow-500' : 'bg-purple-500'}`}></span>
                                <div className="font-semibold">{s.title}</div>
                            </div>
                            <div className="text-sm text-gray-500">{s.leads.length} <span className="text-xs"> ${s.leads.reduce((a, b) => a + Number(b.value.replace(/[^0-9]/g, '')), 0)}</span></div>
                        </div>

                        <div className="space-y-3">
                            {s.leads.length === 0 && <div className="text-sm text-gray-400">No leads in this stage</div>}
                            {s.leads.map((l) => (
                                <div key={l.name} className="p-3 border rounded-md bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium">{l.name}</div>
                                            <div className="text-xs text-gray-500">{l.company}</div>
                                            <div className="text-xs text-gray-400 mt-2">{l.prob}%</div>
                                        </div>
                                        <div className="font-semibold">{l.value}</div>
                                    </div>

                                    <div className="mt-3 flex gap-2">
                                        <button className="text-xs px-2 py-1 bg-green-100 rounded">Win</button>
                                        <button className="text-xs px-2 py-1 bg-rose-100 rounded">Lose</button>
                                        <a className="ml-auto text-xs text-blue-600">Move Forward →</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
