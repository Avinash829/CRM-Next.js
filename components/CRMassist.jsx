'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';


const crmContext = `
You are WilloWave CRM's AI Assistant. Your job is to help users navigate the CRM and understand its features. 
You can:
- Guide them to modules like Dashboard, Contacts, Leads, Pipeline, Reports, Settings.
- If user says "Go to Contacts" or "Open Reports", tell them you're navigating and trigger navigation.
- If they ask about features (automation, reporting, integrations, customer service, etc.), explain briefly.
- If user asks unrelated questions, reply: "I am the CRM Assistant. I can only help with navigation and CRM features."
`;

export default function CrmAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const router = useRouter();

    const toggleChat = () => setOpen(prev => !prev);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const prompt = `
${crmContext}

User question: ${input}
If user intent is navigation, reply with "Navigating to [page]" and only that short text. 
Available pages: /dashboard, /contacts, /leads, /pipeline, /reports, /settings
`;

            const res = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                {
                    contents: [{ parts: [{ text: prompt }] }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-goog-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY

                    }
                }
            );

            const replyText =
                res?.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Something went wrong.';
            const botMessage = { sender: 'bot', text: replyText };
            setMessages(prev => [...prev, botMessage]);

            // If bot says "Navigating to [page]", extract and navigate
            if (replyText.toLowerCase().includes('navigating to')) {
                if (replyText.toLowerCase().includes('contacts')) router.push('/contacts');
                else if (replyText.toLowerCase().includes('dashboard')) router.push('/dashboard');
                else if (replyText.toLowerCase().includes('leads')) router.push('/leads');
                else if (replyText.toLowerCase().includes('pipeline')) router.push('/pipeline');
                else if (replyText.toLowerCase().includes('reports')) router.push('/reports');
                else if (replyText.toLowerCase().includes('settings')) router.push('/settings');
            }
        } catch {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Sorry, there was an error fetching a reply.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-mono fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <motion.button
                onClick={toggleChat}
                className={`p-4 rounded-full shadow-lg text-white transition-all hover:cursor-pointer 
          ${open ? 'bg-blue-500' : 'bg-blue-600 hover:bg-blue-500'}`}
                aria-label="Toggle CRM Assistant"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
                <FaRobot />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-3 w-[90vw] max-w-[400px] h-[500px] bg-white rounded-xl shadow-2xl 
                       flex flex-col overflow-hidden border border-blue-400"
                    >
                        <div className="bg-blue-600 text-white text-center font-bold py-2">
                            WilloWave CRM Assistant
                        </div>

                        <div className="flex-1 p-3 space-y-3 overflow-y-auto text-sm custom-scrollbar">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`px-3 py-2 rounded-lg w-fit break-words max-w-[85%] sm:max-w-[75%] 
                    ${msg.sender === 'user'
                                            ? 'ml-auto bg-blue-600 text-white'
                                            : 'mr-auto bg-gray-200 text-gray-900'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="mr-auto bg-gray-200 text-gray-700 px-3 py-2 rounded-lg">
                                    Typing...
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-2 border-t border-gray-200 flex items-center bg-gray-100">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                className="flex-1 px-3 py-3 rounded-l-md bg-white text-gray-800 outline-none text-sm border"
                                placeholder="Ask CRM Assistant..."
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 px-3 py-3 rounded-r-md text-white hover:bg-blue-500 transition hover:cursor-pointer"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
