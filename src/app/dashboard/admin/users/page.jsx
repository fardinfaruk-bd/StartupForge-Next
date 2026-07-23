import React from 'react';
import { getAllUsers } from '@/lib/api/users';
import UserTable from './usersTable';
import Loading from '@/app/loading';

const Page = async () => {
    const users = await getAllUsers() || [];
    if(!users || users.length === 0) {
        return <Loading />
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Users Directory</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your platform members, assign roles, and handle bans instantly.
                </p>
            </div>

            {users.length > 0 ? (
                <UserTable initialUsers={users} />
            ) : (
                <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl bg-slate-50">
                    <p className="text-slate-500">No users found in the system.</p>
                </div>
            )}
        </div>
    );
};

export default Page;