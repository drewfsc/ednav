// components/DebugAuth.tsx
'use client';

import { useSession } from 'next-auth/react';

export default function DebugAuth() {
  const { data: session, status } = useSession();

  return (
    <div className="p-4 m-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold">Auth Debug</h2>
      <p>Status: {status}</p>
      <pre className="p-2 mt-2 overflow-auto bg-gray-100 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}