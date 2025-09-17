'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { BellIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TopNav = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotifModal, setShowNotifModal] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const notifRef = useRef();
    const userRef = useRef();
    const router = useRouter();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // const res = await fetch('/api/notifications');
                // const data = await res.json();
                // setNotifications(data);

                // example
                setNotifications([
                    { id: 1, message: 'New lead assigned to you.' },
                ]);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifModal(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        router.push("/login");
    };


    return (
        <div className="w-full px-6 py-4  bg-white shadow-sm flex justify-end items-center relative z-50">


            <div className="flex items-center gap-6">

                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setShowNotifModal(!showNotifModal)}
                        className="relative focus:outline-none hover:cursor-pointer"
                    >
                        <BellIcon className="h-6 w-6 text-gray-600" />
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        )}
                    </button>

                    {showNotifModal && (
                        <div className="absolute right-0 mt-2 w-72 bg-white border rounded-md shadow-lg z-50 p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-gray-800 font-semibold text-sm">Notifications</h3>
                                <button onClick={() => setShowNotifModal(false)}>
                                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>

                            {notifications.length > 0 ? (
                                <ul className="space-y-2 max-h-64 overflow-y-auto">
                                    {notifications.map((note) => (
                                        <li key={note.id} className="text-sm text-gray-700 border-b pb-2">
                                            {note.message}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No new messages.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="relative" ref={userRef}>
                    <div
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <span className="text-gray-700 font-medium">Hi Avinash</span>
                        <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                    </div>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 py-2">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
