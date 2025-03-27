'use client';
import { useState } from 'react';

export default function LoginForm({action, title, userData}) {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [message] = useState('');

    return (
        <div className="flex items-center justify-center min-h-full p-10 ">
            <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-100 to-white ring-2 ring-white rounded-xl shadow-xl shadow-zinc-200">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <form action={() => {action({email, pin, userData})}}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">4-Digit PIN</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            maxLength="4"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
            </div>
        </div>
    );
}
