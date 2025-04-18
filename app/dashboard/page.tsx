// app/dashboard/page.tsx
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to the login
  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="mb-8">
        Welcome back, {session.user.name}.
        {session.user.level === 'admin' || session.user.level === 'IT' ? (
          <span className="ml-2 text-emerald-600 font-medium">
            You have {session.user.level} access.
          </span>
        ) : null}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Dashboard Cards */}
        {/*<Link href="/dashboard/clients" className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50">*/}
        {/*  <h5 className="mb-2 text-2xl font-bold tracking-tight">Clients</h5>*/}
        {/*  <p className="font-normal text-gray-700">View and manage client information</p>*/}
        {/*</Link>*/}

        {/* Only show admin tools for IT and admin users */}
        {(session.user.level === 'admin' || session.user.level === 'IT') && (
          <Link href="/dashboard/admin-tools"
                className="block p-6 bg-indigo-50 rounded-lg border border-indigo-200 shadow-md hover:bg-indigo-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-700">Admin Tools</h5>
            <p className="font-normal text-indigo-700">Access system administration features</p>
          </Link>
        )}

        <div className="flex items-center justify-between mb-6">USER MANAGEMENT</div>
      </div>
    </div>
  );
}