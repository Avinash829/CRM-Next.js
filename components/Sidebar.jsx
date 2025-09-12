'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    UserGroupIcon,
    ChartBarIcon,
    FolderIcon,
    SpeakerWaveIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Contacts', href: '/contacts', icon: UserGroupIcon },
    { name: 'Leads', href: '/leads', icon: SpeakerWaveIcon },
    { name: 'Pipeline', href: '/pipeline', icon: ChartBarIcon },
    { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
    const pathname = usePathname() || '/dashboard';

    return (
        <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r shadow-sm flex flex-col">
            {/* Logo / Header */}
            <div className="flex items-center justify-center h-16 border-b px-4">
                <h1 className="text-lg font-bold text-gray-800">
                    WilloWave <span className="text-blue-600">CRM</span>
                </h1>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-2 mt-4">
                <ul className="space-y-1">
                    {navItems.map(({ name, href, icon: Icon }) => {
                        const active =
                            pathname === href || (href === '/dashboard' && pathname === '/');

                        return (
                            <li key={name}>
                                <Link
                                    href={href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${active
                                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-semibold'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    <span>{name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-500 border-t">
                <Link
                    href="/settings"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Account settings
                </Link>
            </div>
        </aside>
    );
}
